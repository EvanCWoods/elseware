import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChannelState, SavedMix } from '../types';

const STORAGE_KEY = '@elseware/saved_mixes';
const MAX_MIXES = 20;

export function useSavedMixes(isPro: boolean) {
  const [savedMixes, setSavedMixes] = useState<SavedMix[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) setSavedMixes(JSON.parse(raw));
      })
      .catch(() => {});
  }, []);

  const persist = useCallback(async (mixes: SavedMix[]) => {
    setSavedMixes(mixes);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(mixes));
  }, []);

  const saveMix = useCallback(
    async (name: string, channels: Record<string, ChannelState>, masterVolume: number) => {
      if (!isPro) return;
      if (savedMixes.length >= MAX_MIXES) return;

      const stripped: SavedMix['channels'] = {};
      Object.entries(channels).forEach(([id, state]) => {
        stripped[id] = { active: state.active, volume: state.volume };
      });

      const mix: SavedMix = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        name,
        channels: stripped,
        masterVolume,
        createdAt: Date.now(),
      };

      await persist([mix, ...savedMixes]);
    },
    [isPro, savedMixes, persist],
  );

  const deleteMix = useCallback(
    async (id: string) => {
      if (!isPro) return;
      await persist(savedMixes.filter((m) => m.id !== id));
    },
    [isPro, savedMixes, persist],
  );

  return { savedMixes, saveMix, deleteMix };
}
