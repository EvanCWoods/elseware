import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { Audio } from 'expo-av';
import { ChannelState } from '../types';

export function useBackgroundAudioGate(
  isPro: boolean,
  channels: Record<string, ChannelState>,
  soundsRef: React.MutableRefObject<Record<string, Audio.Sound>>,
) {
  const pausedChannelsRef = useRef<string[]>([]);

  useEffect(() => {
    if (isPro) return;

    function handleAppStateChange(nextState: AppStateStatus) {
      if (nextState === 'background' || nextState === 'inactive') {
        // Pause all active sounds for free users
        const toPause: string[] = [];
        Object.entries(channels).forEach(([id, state]) => {
          if (state.active && soundsRef.current[id]) {
            soundsRef.current[id].pauseAsync().catch(() => {});
            toPause.push(id);
          }
        });
        pausedChannelsRef.current = toPause;

        Audio.setAudioModeAsync({ staysActiveInBackground: false }).catch(() => {});
      } else if (nextState === 'active') {
        // Resume sounds when returning to foreground
        Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
          shouldDuckAndroid: true,
        }).catch(() => {});

        pausedChannelsRef.current.forEach((id) => {
          if (soundsRef.current[id]) {
            soundsRef.current[id].playAsync().catch(() => {});
          }
        });
        pausedChannelsRef.current = [];
      }
    }

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, [isPro, channels, soundsRef]);
}
