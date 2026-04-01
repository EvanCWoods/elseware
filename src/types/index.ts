import { Audio } from 'expo-av';

export interface ChannelConfig {
  id: string;
  name: string;
  audioFile: any; // require() asset
}

export interface ChannelState {
  active: boolean;
  volume: number; // 0-100
  sound: Audio.Sound | null;
}

export interface Preset {
  name: string;
  music: Record<string, number>;
  sfx: Record<string, number>;
}

export interface SavedMix {
  id: string;
  name: string;
  channels: Record<string, { active: boolean; volume: number }>;
  masterVolume: number;
  createdAt: number;
}
