#!/usr/bin/env node
/*
 * generate-wallpapers.js
 *
 * Generates 12 lock-in wallpapers as SVG into assets/wallpapers/.
 * Output: 1170 x 2532 (iPhone 15 Pro / 14 Pro / 13 Pro / 12 Pro), safe for
 * up-/down-scaling to 1242×2688 or 1290×2796 by the OS.
 *
 * Convert SVG → PNG before shipping to users (iOS doesn't take SVG wallpapers):
 *   brew install librsvg
 *   for f in assets/wallpapers/*.svg; do
 *     rsvg-convert -w 1170 -h 2532 "$f" -o "${f%.svg}.png"
 *   done
 *
 * Or open each in Figma / any SVG editor and export at 1170×2532.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'assets', 'wallpapers');

const W = 1170;
const H = 2532;

// Brand palette (matches src/config/theme.ts).
const palette = {
  cream: '#f4f1ec',
  warm: '#faf8f4',
  ink: '#2e2a24',
  inkDim: '#7a7268',
  inkMute: '#a89e94',
  accent: '#a688b5',
  accentSoft: '#f3eef6',
  night: '#1a1714',
  nightInk: '#e7e3da',
};

/**
 * Wallpaper config. Each entry produces one SVG.
 *
 * mode: 'day' = cream bg + ink type; 'night' = night bg + cream type.
 * accent: small geometric motif rendered behind the type (a faint visual
 *   signature unique to the place, while the layout stays consistent).
 */
const wallpapers = [
  { id: '01-tokyo-kissaten',     name: 'Tokyo Kissaten',     mood: 'light rain · lo-fi · vinyl',         time: '4PM',  mode: 'day',   accent: 'rain'      },
  { id: '02-lisbon-rainstorm',   name: 'Lisbon Rainstorm',   mood: 'thunder · jazz · fireplace',         time: '11PM', mode: 'night', accent: 'storm'     },
  { id: '03-library-in-seoul',   name: 'Library in Seoul',   mood: 'ambient · rain · typing',            time: '7AM',  mode: 'day',   accent: 'grid'      },
  { id: '04-trans-siberian',     name: 'Trans-Siberian',     mood: 'synthwave · train · rain',           time: '9PM',  mode: 'night', accent: 'rails'     },
  { id: '05-bali-morning',       name: 'Bali Morning',       mood: 'classical · birds · wind',           time: '6AM',  mode: 'day',   accent: 'sun'       },
  { id: '06-tulum-beachfront',   name: 'Tulum Beachfront',   mood: 'piano · ocean · wind',               time: '6PM',  mode: 'day',   accent: 'horizon'   },
  { id: '07-kyoto-tea-house',    name: 'Kyoto Tea House',    mood: 'piano · ambient · light rain',       time: '3PM',  mode: 'day',   accent: 'circle'    },
  { id: '08-marfa-desert',       name: 'Marfa Desert',       mood: 'ambient · wind · fireplace',         time: '3AM',  mode: 'night', accent: 'arc'       },
  { id: '09-berlin-backroom',    name: 'Berlin Backroom',    mood: 'synthwave · city · chatter',         time: '2AM',  mode: 'night', accent: 'pillars'   },
  { id: '10-reykjavik-4am',      name: 'Reykjavik 4am',      mood: 'ambient · wind · ocean',             time: '4AM',  mode: 'night', accent: 'aurora'    },
  { id: '11-elseware-mark',      name: 'elseware',           mood: 'put yourself somewhere',             time: '',     mode: 'day',   accent: 'mark'      },
  { id: '12-lock-in',            name: 'lock in.',           mood: 'one purchase. yours forever.',       time: '',     mode: 'day',   accent: 'rule'      },
];

function colorsFor(mode) {
  if (mode === 'night') {
    return {
      bg: palette.night,
      type: palette.nightInk,
      typeDim: palette.inkMute,
      accent: palette.accent,
      rule: '#3a322b',
    };
  }
  return {
    bg: palette.cream,
    type: palette.ink,
    typeDim: palette.inkDim,
    accent: palette.accent,
    rule: '#d8d2c8',
  };
}

/** Render a faint geometric accent motif unique per place. */
function accentSVG(kind, c) {
  const stroke = c.accent;
  const dim = c.typeDim;
  switch (kind) {
    case 'rain':
      return Array.from({ length: 14 }, (_, i) => {
        const x = 140 + i * 70;
        const y1 = 360 + (i % 3) * 8;
        const y2 = y1 + 80;
        return `<line x1="${x}" y1="${y1}" x2="${x - 18}" y2="${y2}" stroke="${dim}" stroke-width="1.2" opacity="0.35"/>`;
      }).join('\n      ');
    case 'storm':
      return `
      <polyline points="180,420 320,540 260,540 380,720" fill="none" stroke="${stroke}" stroke-width="2" opacity="0.45"/>
      <polyline points="820,500 940,640 880,640 980,820" fill="none" stroke="${stroke}" stroke-width="1.6" opacity="0.30"/>`;
    case 'grid':
      {
        const lines = [];
        for (let x = 220; x <= W - 220; x += 80) lines.push(`<line x1="${x}" y1="380" x2="${x}" y2="780" stroke="${dim}" stroke-width="1" opacity="0.25"/>`);
        for (let y = 380; y <= 780; y += 80) lines.push(`<line x1="220" y1="${y}" x2="${W - 220}" y2="${y}" stroke="${dim}" stroke-width="1" opacity="0.25"/>`);
        return lines.join('\n      ');
      }
    case 'rails':
      return `
      <line x1="180" y1="700" x2="${W - 180}" y2="700" stroke="${dim}" stroke-width="1.5" opacity="0.4"/>
      <line x1="180" y1="740" x2="${W - 180}" y2="740" stroke="${dim}" stroke-width="1.5" opacity="0.4"/>
      ${Array.from({ length: 18 }, (_, i) => `<line x1="${200 + i * 50}" y1="700" x2="${200 + i * 50}" y2="740" stroke="${dim}" stroke-width="1" opacity="0.35"/>`).join('\n      ')}`;
    case 'sun':
      return `
      <circle cx="${W / 2}" cy="600" r="180" fill="none" stroke="${stroke}" stroke-width="1.5" opacity="0.4"/>
      <circle cx="${W / 2}" cy="600" r="120" fill="none" stroke="${stroke}" stroke-width="1" opacity="0.25"/>`;
    case 'horizon':
      return `
      <line x1="120" y1="640" x2="${W - 120}" y2="640" stroke="${stroke}" stroke-width="2" opacity="0.5"/>
      <line x1="220" y1="700" x2="${W - 220}" y2="700" stroke="${dim}" stroke-width="1" opacity="0.3"/>`;
    case 'circle':
      return `
      <circle cx="${W / 2}" cy="640" r="240" fill="none" stroke="${stroke}" stroke-width="1.2" opacity="0.35"/>
      <circle cx="${W / 2}" cy="640" r="160" fill="none" stroke="${stroke}" stroke-width="1.2" opacity="0.25"/>
      <circle cx="${W / 2}" cy="640" r="80" fill="none" stroke="${stroke}" stroke-width="1.2" opacity="0.20"/>`;
    case 'arc':
      return `
      <path d="M 80 800 Q ${W / 2} 380 ${W - 80} 800" fill="none" stroke="${stroke}" stroke-width="1.5" opacity="0.4"/>`;
    case 'pillars':
      return Array.from({ length: 7 }, (_, i) => {
        const x = 200 + i * 120;
        return `<rect x="${x}" y="380" width="40" height="420" fill="none" stroke="${dim}" stroke-width="1" opacity="0.30"/>`;
      }).join('\n      ');
    case 'aurora':
      return `
      <path d="M 80 720 Q 300 420 500 660 T 1080 600" fill="none" stroke="${stroke}" stroke-width="2" opacity="0.45"/>
      <path d="M 80 800 Q 400 520 700 760 T 1080 700" fill="none" stroke="${stroke}" stroke-width="1.4" opacity="0.30"/>`;
    case 'mark':
      return `
      <circle cx="${W / 2}" cy="640" r="200" fill="none" stroke="${stroke}" stroke-width="1.5" opacity="0.35"/>
      <text x="${W / 2}" y="700" font-family="Georgia, 'Times New Roman', serif" font-size="240" fill="${stroke}" text-anchor="middle" opacity="0.55">e</text>`;
    case 'rule':
      return `<line x1="${W / 2 - 80}" y1="700" x2="${W / 2 + 80}" y2="700" stroke="${stroke}" stroke-width="2" opacity="0.6"/>`;
    default:
      return '';
  }
}

function svgFor(wp) {
  const c = colorsFor(wp.mode);
  const accent = accentSVG(wp.accent, c);

  // Centered name. Mood underneath in tracked-out grotesque caps.
  // Brand mark + time pinned bottom for context without dominating.

  // Name rendered with serif font stack — system fonts only so this looks
  // good even before the operator imports a custom face.
  const serifStack = "'Georgia', 'Times New Roman', serif";
  const grotStack = "'Helvetica Neue', 'Inter', 'Arial', sans-serif";

  const isPure = wp.accent === 'mark' || wp.accent === 'rule';
  const titleSize = isPure ? 168 : 116;
  const titleWeight = isPure ? 400 : 300;

  // Lower band: time-of-day and brand mark.
  const lowerBand = wp.time
    ? `
    <text x="120" y="${H - 220}" font-family="${grotStack}" font-size="20" letter-spacing="6" fill="${c.typeDim}" opacity="0.85">${wp.time}</text>
    <text x="${W - 120}" y="${H - 220}" font-family="${grotStack}" font-size="20" letter-spacing="6" fill="${c.typeDim}" opacity="0.85" text-anchor="end">ELSEWARE</text>`
    : `
    <text x="${W / 2}" y="${H - 220}" font-family="${grotStack}" font-size="20" letter-spacing="6" fill="${c.typeDim}" opacity="0.85" text-anchor="middle">ELSEWARE</text>`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <!-- Generated by scripts/generate-wallpapers.js. Do not edit by hand. -->
  <rect width="${W}" height="${H}" fill="${c.bg}"/>

  <!-- Soft inner frame to add intentionality without being noisy. -->
  <rect x="60" y="60" width="${W - 120}" height="${H - 120}" fill="none" stroke="${c.rule}" stroke-width="1" opacity="0.5"/>

  <!-- Place-specific accent -->
  <g>
      ${accent}
  </g>

  <!-- Center stack: name + mood -->
  <g>
    <text x="${W / 2}" y="1100" font-family="${serifStack}" font-style="italic" font-weight="${titleWeight}" font-size="${titleSize}" fill="${c.type}" text-anchor="middle">${escapeText(wp.name)}</text>
    <line x1="${W / 2 - 60}" y1="1170" x2="${W / 2 + 60}" y2="1170" stroke="${c.rule}" stroke-width="1.2"/>
    <text x="${W / 2}" y="1230" font-family="${grotStack}" font-size="28" letter-spacing="3" fill="${c.typeDim}" text-anchor="middle">${escapeText(wp.mood)}</text>
  </g>

  ${lowerBand}
</svg>
`;
}

function escapeText(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  // Clean previously generated SVGs (keep PNGs in case operator already exported).
  const existing = fs.readdirSync(OUT_DIR).filter((f) => f.endsWith('.svg'));
  for (const f of existing) fs.unlinkSync(path.join(OUT_DIR, f));

  for (const wp of wallpapers) {
    const filename = path.join(OUT_DIR, `${wp.id}.svg`);
    fs.writeFileSync(filename, svgFor(wp), 'utf8');
    console.log(`✓ ${path.relative(ROOT, filename)}`);
  }
  console.log(`\nWrote ${wallpapers.length} wallpapers to ${path.relative(ROOT, OUT_DIR)}/`);
}

main();
