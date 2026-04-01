import { ChannelConfig } from '../types';

export const MUSIC_CHANNELS: ChannelConfig[] = [
  { id: 'lofi',      name: 'Lo-Fi Hip Hop', audioFile: require('../../assets/sounds/lofi.mp3') },
  { id: 'jazz',      name: 'Smooth Jazz',   audioFile: require('../../assets/sounds/jazz.mp3') },
  { id: 'classical', name: 'Classical',      audioFile: require('../../assets/sounds/classical.mp3') },
  { id: 'synthwave', name: 'Synthwave',      audioFile: require('../../assets/sounds/synthwave.mp3') },
  { id: 'ambient',   name: 'Ambient',        audioFile: require('../../assets/sounds/ambient.mp3') },
  { id: 'piano',     name: 'Piano',          audioFile: require('../../assets/sounds/piano.mp3') },
];

export const SFX_CHANNELS: ChannelConfig[] = [
  { id: 'rain',      name: 'Rain',           audioFile: require('../../assets/sounds/rain.mp3') },
  { id: 'thunder',   name: 'Thunderstorm',   audioFile: require('../../assets/sounds/thunder.mp3') },
  { id: 'coffee',    name: 'Coffee Shop',    audioFile: require('../../assets/sounds/coffee-shop.mp3') },
  { id: 'fireplace', name: 'Fireplace',      audioFile: require('../../assets/sounds/fireplace.mp3') },
  { id: 'train',     name: 'Train Ride',     audioFile: require('../../assets/sounds/train.mp3') },
  { id: 'chatter',   name: 'Chatter',        audioFile: require('../../assets/sounds/chatter.mp3') },
  { id: 'wind',      name: 'Wind',           audioFile: require('../../assets/sounds/wind.mp3') },
  { id: 'birds',     name: 'Birds',          audioFile: require('../../assets/sounds/birds.mp3') },
  { id: 'ocean',     name: 'Ocean Waves',    audioFile: require('../../assets/sounds/ocean.mp3') },
  { id: 'typing',    name: 'Typing',         audioFile: require('../../assets/sounds/typing.mp3') },
  { id: 'vinyl',     name: 'Vinyl Crackle',  audioFile: require('../../assets/sounds/vinyl-crackle.mp3') },
  { id: 'city',      name: 'City Traffic',   audioFile: require('../../assets/sounds/city-traffic.mp3') },
];

export const ALL_CHANNELS = [...MUSIC_CHANNELS, ...SFX_CHANNELS];
