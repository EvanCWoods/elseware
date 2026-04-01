import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { ChannelState } from '../types';

export function useVUMeter(
  channels: Record<string, ChannelState>,
  masterVolume: number,
) {
  const vuLevel = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      const activeChannels = Object.values(channels).filter((c) => c.active);
      if (activeChannels.length === 0) {
        Animated.timing(vuLevel, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start();
        return;
      }

      const avgVolume =
        activeChannels.reduce((sum, c) => sum + c.volume, 0) / activeChannels.length;
      const level = (avgVolume / 100) * (masterVolume / 100) * 80;
      // Add random noise ±5% for visual realism
      const noise = (Math.random() - 0.5) * 10;
      const clamped = Math.max(0, Math.min(100, level + noise));

      Animated.timing(vuLevel, {
        toValue: clamped,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }, 100);

    return () => clearInterval(interval);
  }, [channels, masterVolume, vuLevel]);

  return vuLevel;
}
