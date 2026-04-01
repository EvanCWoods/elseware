import { Preset } from '../types';

export const PRESETS: Preset[] = [
  { name: 'Tokyo Kissaten',   music: { lofi: 60 },      sfx: { coffee: 50, chatter: 30, vinyl: 20 } },
  { name: 'Lisbon Rainstorm', music: { jazz: 50 },       sfx: { rain: 70, thunder: 25, fireplace: 40 } },
  { name: 'Library in Seoul', music: { ambient: 40 },    sfx: { rain: 30, typing: 15 } },
  { name: 'Trans-Siberian',   music: { synthwave: 55 },  sfx: { train: 60, rain: 20 } },
  { name: 'Bali Morning',     music: { classical: 45 },  sfx: { birds: 50, wind: 30 } },
  { name: 'Tulum Beachfront', music: { piano: 50 },      sfx: { ocean: 60, wind: 20, birds: 15 } },
  { name: 'Clear All',        music: {},                  sfx: {} },
];
