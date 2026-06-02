import { Preset } from '../types';

export const PRESETS: Preset[] = [
  { name: 'Tokyo Kissaten',   music: { lofi: 60 },      sfx: { coffee: 50, chatter: 30, vinyl: 20 } },
  { name: 'Lisbon Rainstorm', music: { jazz: 50 },       sfx: { rain: 70, thunder: 25, fireplace: 40 } },
  { name: 'Library in Seoul', music: { ambient: 40 },    sfx: { rain: 30, typing: 15 } },
  { name: 'Trans-Siberian',   music: { synthwave: 55 },  sfx: { train: 60, rain: 20 } },
  { name: 'Bali Morning',     music: { classical: 45 },  sfx: { birds: 50, wind: 30 } },
  { name: 'Tulum Beachfront', music: { piano: 50 },      sfx: { ocean: 60, wind: 20, birds: 15 } },

  // The Locked-In Preset Pack — bonus stack, lifetime owners only
  { name: 'Kyoto Tea House',  music: { piano: 40, ambient: 30 }, sfx: { rain: 25, birds: 15, wind: 10 }, lifetimeOnly: true },
  { name: 'Marfa Desert',     music: { ambient: 50 },             sfx: { wind: 60, fireplace: 30 },                 lifetimeOnly: true },
  { name: 'Berlin Backroom',  music: { synthwave: 45 },           sfx: { city: 35, chatter: 25, typing: 15 },       lifetimeOnly: true },
  { name: 'Reykjavik 4am',    music: { ambient: 55 },             sfx: { wind: 70, ocean: 25 },                     lifetimeOnly: true },

  { name: 'Clear All',        music: {},                  sfx: {} },
];
