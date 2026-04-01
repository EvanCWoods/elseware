import { useCallback, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';
import { ALL_CHANNELS } from '../config/channels';
import { ChannelState, Preset } from '../types';
import { FREE_SOUND_LIMIT } from '../config/constants';

export type ToggleResult = 'ok' | 'limit_reached';

export function effectiveVolume(channelVolume: number, masterVolume: number): number {
  return (channelVolume / 100) * (masterVolume / 100);
}

export function useAudioEngine(
  channels: Record<string, ChannelState>,
  masterVolume: number,
  setChannels: (updater: (prev: Record<string, ChannelState>) => Record<string, ChannelState>) => void,
  setMasterVolume: (vol: number) => void,
  isPro: boolean,
) {
  const soundsRef = useRef<Record<string, Audio.Sound>>({});

  // Set up audio mode on mount
  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      shouldDuckAndroid: true,
    });

    return () => {
      Object.values(soundsRef.current).forEach((sound) => {
        sound.unloadAsync().catch(() => {});
      });
    };
  }, []);

  const getOrCreateSound = useCallback(async (channelId: string): Promise<Audio.Sound | null> => {
    if (soundsRef.current[channelId]) {
      return soundsRef.current[channelId];
    }

    const config = ALL_CHANNELS.find((c) => c.id === channelId);
    if (!config) return null;

    try {
      const { sound } = await Audio.Sound.createAsync(config.audioFile, {
        isLooping: true,
        volume: 0,
        shouldPlay: false,
      });
      soundsRef.current[channelId] = sound;
      return sound;
    } catch (e) {
      console.warn(`Failed to load sound for ${channelId}:`, e);
      return null;
    }
  }, []);

  const toggleChannel = useCallback(async (channelId: string): Promise<ToggleResult> => {
    const state = channels[channelId];
    const newActive = !state?.active;

    if (newActive) {
      if (!isPro) {
        const activeCount = Object.values(channels).filter((c) => c.active).length;
        if (activeCount >= FREE_SOUND_LIMIT) {
          return 'limit_reached';
        }
      }
      const sound = await getOrCreateSound(channelId);
      if (sound) {
        const vol = effectiveVolume(state?.volume ?? 50, masterVolume);
        await sound.setVolumeAsync(vol);
        await sound.playAsync();
        setChannels((prev) => ({
          ...prev,
          [channelId]: { ...prev[channelId], active: true, sound },
        }));
      }
    } else {
      const sound = soundsRef.current[channelId];
      if (sound) {
        await sound.pauseAsync();
      }
      setChannels((prev) => ({
        ...prev,
        [channelId]: { ...prev[channelId], active: false },
      }));
    }
    return 'ok';
  }, [channels, masterVolume, isPro, getOrCreateSound, setChannels]);

  const setChannelVolume = useCallback(async (channelId: string, volume: number) => {
    setChannels((prev) => ({
      ...prev,
      [channelId]: { ...prev[channelId], volume },
    }));

    const sound = soundsRef.current[channelId];
    if (sound && channels[channelId]?.active) {
      const vol = effectiveVolume(volume, masterVolume);
      await sound.setVolumeAsync(vol);
    }
  }, [channels, masterVolume, setChannels]);

  const handleMasterVolume = useCallback(async (newMaster: number) => {
    setMasterVolume(newMaster);
    const promises = Object.entries(channels).map(async ([id, state]) => {
      if (state.active && soundsRef.current[id]) {
        const vol = effectiveVolume(state.volume, newMaster);
        await soundsRef.current[id].setVolumeAsync(vol);
      }
    });
    await Promise.all(promises);
  }, [channels, setMasterVolume]);

  const applyPreset = useCallback(async (preset: Preset): Promise<ToggleResult> => {
    const presetChannelCount =
      Object.keys(preset.music).length + Object.keys(preset.sfx).length;
    if (!isPro && presetChannelCount > FREE_SOUND_LIMIT) {
      return 'limit_reached';
    }

    // Pause all active channels
    const stopPromises = Object.entries(channels).map(async ([id, state]) => {
      if (state.active && soundsRef.current[id]) {
        await soundsRef.current[id].pauseAsync();
      }
    });
    await Promise.all(stopPromises);

    // Reset all channels
    const resetChannels: Record<string, ChannelState> = {};
    ALL_CHANNELS.forEach((c) => {
      resetChannels[c.id] = { active: false, volume: 50, sound: null };
    });

    // Activate preset channels
    const allPresetChannels = { ...preset.music, ...preset.sfx };
    const startPromises = Object.entries(allPresetChannels).map(async ([id, volume]) => {
      const sound = await getOrCreateSound(id);
      if (sound) {
        const vol = effectiveVolume(volume, masterVolume);
        await sound.setVolumeAsync(vol);
        await sound.playAsync();
        resetChannels[id] = { active: true, volume, sound };
      }
    });
    await Promise.all(startPromises);

    setChannels(() => resetChannels);
    return 'ok';
  }, [channels, masterVolume, isPro, getOrCreateSound, setChannels]);

  return { toggleChannel, setChannelVolume, handleMasterVolume, applyPreset, soundsRef };
}
