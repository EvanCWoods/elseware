#!/usr/bin/env node
/*
 * generate-app-store-screenshots.js
 *
 * Emits 8 App Store screenshot SVGs to assets/app-store/.
 * Output: 1290 x 2796 (iPhone 15 Pro Max — Apple's primary device size).
 * iOS derives smaller sizes from the primary, but you can also export
 * 1242x2688 (6.5") and 1242x2208 (5.5") if your App Store Connect setup
 * still has those slots.
 *
 * Brief: marketing/10-APP-STORE-COPY-TO-SHIP.md
 *
 * Convert SVG → PNG before uploading to App Store Connect (Apple wants PNG):
 *   brew install librsvg
 *   for f in assets/app-store/*.svg; do
 *     rsvg-convert -w 1290 -h 2796 "$f" -o "${f%.svg}.png"
 *   done
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'assets', 'app-store');

const W = 1290;
const H = 2796;

const palette = {
  cream: '#f4f1ec',
  warm: '#faf8f4',
  white: '#ffffff',
  ink: '#2e2a24',
  inkDim: '#7a7268',
  inkMute: '#a89e94',
  accent: '#a688b5',
  accentSoft: '#f3eef6',
  accentLight: '#e8ddef',
  border: '#e0dbd4',
  cardBorder: '#e8e4de',
  night: '#1a1714',
  nightInk: '#e7e3da',
};

const serif = "'Georgia', 'Times New Roman', serif";
const grot = "'Helvetica Neue', 'Inter', 'Arial', sans-serif";

// ---------- shared helpers ----------

function escapeText(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function header(eyebrow) {
  return `
    <text x="${W / 2}" y="240" font-family="${grot}" font-size="34" letter-spacing="8" fill="${palette.accent}" text-anchor="middle" font-weight="600">${escapeText(eyebrow)}</text>
  `;
}

function brandFooter(y = H - 110) {
  return `
    <text x="${W / 2}" y="${y}" font-family="${grot}" font-size="28" letter-spacing="8" fill="${palette.inkMute}" text-anchor="middle">ELSEWARE</text>
  `;
}

/**
 * Phone bezel mockup. Renders an iPhone-shaped frame with a transparent
 * inner cutout the caller fills with content via the `inner` callback.
 */
function phoneMockup({ x, y, w, h, inner }) {
  const radius = w * 0.18;
  const innerInset = w * 0.04;
  const innerX = x + innerInset;
  const innerY = y + innerInset;
  const innerW = w - innerInset * 2;
  const innerH = h - innerInset * 2;
  const innerRadius = radius - innerInset;
  return `
  <g>
    <!-- bezel -->
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${palette.ink}" stroke="${palette.ink}" stroke-width="1"/>
    <!-- screen -->
    <rect x="${innerX}" y="${innerY}" width="${innerW}" height="${innerH}" rx="${innerRadius}" fill="${palette.cream}"/>
    <!-- dynamic island -->
    <rect x="${x + w / 2 - 60}" y="${y + 40}" width="120" height="34" rx="17" fill="${palette.ink}"/>
    <!-- inner content -->
    ${inner(innerX, innerY, innerW, innerH, innerRadius)}
  </g>`;
}

// ---------- screenshot 01 — Hero ----------

function screenshot01() {
  // Phone mockup occupying the lower half showing the Tokyo Kissaten preset
  // playing with three channels lit.
  const phoneW = 760;
  const phoneH = 1500;
  const phoneX = (W - phoneW) / 2;
  const phoneY = 900;

  const phoneInner = (ix, iy, iw, ih) => {
    const padX = 50;
    const cx = ix + iw / 2;
    const lines = [];

    // Header band: master volume + VU
    lines.push(`<rect x="${ix + padX}" y="${iy + 110}" width="${iw - padX * 2}" height="64" rx="12" fill="${palette.warm}" stroke="${palette.cardBorder}" stroke-width="1"/>`);
    lines.push(`<text x="${ix + padX + 24}" y="${iy + 150}" font-family="${grot}" font-size="20" fill="${palette.inkDim}" letter-spacing="3">MASTER</text>`);
    lines.push(`<rect x="${ix + padX + 130}" y="${iy + 138}" width="${iw - padX * 2 - 160}" height="8" rx="4" fill="${palette.cardBorder}"/>`);
    lines.push(`<rect x="${ix + padX + 130}" y="${iy + 138}" width="${(iw - padX * 2 - 160) * 0.7}" height="8" rx="4" fill="${palette.accent}"/>`);

    // Section: Music
    lines.push(`<text x="${ix + padX}" y="${iy + 240}" font-family="${grot}" font-size="22" letter-spacing="4" fill="${palette.inkDim}" font-weight="700">MUSIC</text>`);

    // Grid of 6 channel cells, 3 wide
    const cellW = (iw - padX * 2 - 16) / 3;
    const cellH = 90;
    const musicLabels = ['Lo-Fi', 'Jazz', 'Classical', 'Synthwave', 'Ambient', 'Piano'];
    const musicActive = [true, false, false, false, false, false];
    for (let i = 0; i < 6; i++) {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const cx0 = ix + padX + col * (cellW + 8);
      const cy0 = iy + 270 + row * (cellH + 10);
      const fill = musicActive[i] ? palette.accent : palette.white;
      const textColor = musicActive[i] ? palette.white : palette.ink;
      lines.push(`<rect x="${cx0}" y="${cy0}" width="${cellW}" height="${cellH}" rx="14" fill="${fill}" stroke="${palette.cardBorder}" stroke-width="1"/>`);
      lines.push(`<text x="${cx0 + cellW / 2}" y="${cy0 + cellH / 2 + 6}" font-family="${grot}" font-size="20" fill="${textColor}" text-anchor="middle" font-weight="600">${musicLabels[i]}</text>`);
    }

    // Section: Soundscapes
    lines.push(`<text x="${ix + padX}" y="${iy + 510}" font-family="${grot}" font-size="22" letter-spacing="4" fill="${palette.inkDim}" font-weight="700">SOUNDSCAPES</text>`);
    const sfxLabels = ['Rain', 'Coffee', 'Vinyl', 'Chatter', 'Wind', 'Birds'];
    const sfxActive = [true, true, true, false, false, false];
    for (let i = 0; i < 6; i++) {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const cx0 = ix + padX + col * (cellW + 8);
      const cy0 = iy + 540 + row * (cellH + 10);
      const fill = sfxActive[i] ? palette.accent : palette.white;
      const textColor = sfxActive[i] ? palette.white : palette.ink;
      lines.push(`<rect x="${cx0}" y="${cy0}" width="${cellW}" height="${cellH}" rx="14" fill="${fill}" stroke="${palette.cardBorder}" stroke-width="1"/>`);
      lines.push(`<text x="${cx0 + cellW / 2}" y="${cy0 + cellH / 2 + 6}" font-family="${grot}" font-size="20" fill="${textColor}" text-anchor="middle" font-weight="600">${sfxLabels[i]}</text>`);
    }

    // Active preset chip
    lines.push(`<text x="${ix + padX}" y="${iy + 800}" font-family="${grot}" font-size="22" letter-spacing="4" fill="${palette.inkDim}" font-weight="700">PLACES</text>`);
    lines.push(`<rect x="${ix + padX}" y="${iy + 825}" width="${cellW * 1.6}" height="64" rx="32" fill="${palette.accent}"/>`);
    lines.push(`<text x="${ix + padX + cellW * 0.8}" y="${iy + 866}" font-family="${grot}" font-size="22" font-weight="600" fill="${palette.white}" text-anchor="middle">Tokyo Kissaten</text>`);

    return lines.join('\n        ');
  };

  return svgWrap(`
    <rect width="${W}" height="${H}" fill="${palette.cream}"/>
    ${header('THE AUDIO UNIFORM OF LOCKING IN')}

    <text x="${W / 2}" y="450" font-family="${serif}" font-style="italic" font-size="160" fill="${palette.ink}" text-anchor="middle" font-weight="300">Put yourself</text>
    <text x="${W / 2}" y="620" font-family="${serif}" font-style="italic" font-size="160" fill="${palette.ink}" text-anchor="middle" font-weight="300">somewhere.</text>

    <text x="${W / 2}" y="760" font-family="${grot}" font-size="32" fill="${palette.inkDim}" text-anchor="middle">6 hand-built places. 18 channels.</text>

    ${phoneMockup({ x: phoneX, y: phoneY, w: phoneW, h: phoneH, inner: phoneInner })}

    ${brandFooter()}
  `);
}

// ---------- screenshot 02 — Place gallery ----------

function screenshot02() {
  const places = [
    { name: 'Tokyo Kissaten',   mood: 'light rain · lo-fi · vinyl' },
    { name: 'Lisbon Rainstorm', mood: 'thunder · jazz · fireplace' },
    { name: 'Library in Seoul', mood: 'ambient · rain · typing' },
    { name: 'Trans-Siberian',   mood: 'synthwave · train · rain' },
    { name: 'Bali Morning',     mood: 'classical · birds · wind' },
    { name: 'Tulum Beachfront', mood: 'piano · ocean · wind' },
  ];

  const cardW = 1080;
  const cardH = 280;
  const cardX = (W - cardW) / 2;
  const startY = 580;
  const gap = 30;

  const cards = places.map((p, i) => {
    const y = startY + i * (cardH + gap);
    return `
    <g>
      <rect x="${cardX}" y="${y}" width="${cardW}" height="${cardH}" rx="24" fill="${palette.white}" stroke="${palette.cardBorder}" stroke-width="1"/>
      <text x="${cardX + 60}" y="${y + 130}" font-family="${serif}" font-style="italic" font-size="76" fill="${palette.ink}" font-weight="300">${escapeText(p.name)}</text>
      <text x="${cardX + 60}" y="${y + 200}" font-family="${grot}" font-size="32" fill="${palette.inkDim}" letter-spacing="2">${escapeText(p.mood)}</text>
    </g>`;
  }).join('\n');

  return svgWrap(`
    <rect width="${W}" height="${H}" fill="${palette.cream}"/>
    ${header('SIX HAND-BUILT PLACES')}

    <text x="${W / 2}" y="430" font-family="${serif}" font-style="italic" font-size="120" fill="${palette.ink}" text-anchor="middle" font-weight="300">Pick a place.</text>
    <text x="${W / 2}" y="560" font-family="${serif}" font-style="italic" font-size="120" fill="${palette.ink}" text-anchor="middle" font-weight="300">Lock in.</text>

    ${cards}

    ${brandFooter()}
  `);
}

// ---------- screenshot 03 — Mixer detail ----------

function screenshot03() {
  // Reuse the phone mockup from screenshot 01 but full-bleed mixer at top.
  const phoneW = 1000;
  const phoneH = 2000;
  const phoneX = (W - phoneW) / 2;
  const phoneY = 540;

  const phoneInner = (ix, iy, iw, ih) => {
    const padX = 60;
    const lines = [];

    lines.push(`<text x="${ix + padX}" y="${iy + 240}" font-family="${grot}" font-size="28" letter-spacing="5" fill="${palette.inkDim}" font-weight="700">MUSIC</text>`);

    const cellW = (iw - padX * 2 - 24) / 3;
    const cellH = 130;
    const musicLabels = ['Lo-Fi', 'Jazz', 'Classical', 'Synthwave', 'Ambient', 'Piano'];
    const musicActive = [true, false, true, false, false, false];
    for (let i = 0; i < 6; i++) {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const cx0 = ix + padX + col * (cellW + 12);
      const cy0 = iy + 280 + row * (cellH + 14);
      const fill = musicActive[i] ? palette.accent : palette.white;
      const textColor = musicActive[i] ? palette.white : palette.ink;
      lines.push(`<rect x="${cx0}" y="${cy0}" width="${cellW}" height="${cellH}" rx="18" fill="${fill}" stroke="${palette.cardBorder}" stroke-width="1"/>`);
      lines.push(`<text x="${cx0 + cellW / 2}" y="${cy0 + cellH * 0.42}" font-family="${grot}" font-size="26" fill="${textColor}" text-anchor="middle" font-weight="600">${musicLabels[i]}</text>`);
      // mini volume bar
      lines.push(`<rect x="${cx0 + 16}" y="${cy0 + cellH - 28}" width="${cellW - 32}" height="6" rx="3" fill="${musicActive[i] ? '#ffffff66' : palette.cardBorder}"/>`);
      if (musicActive[i]) {
        lines.push(`<rect x="${cx0 + 16}" y="${cy0 + cellH - 28}" width="${(cellW - 32) * 0.6}" height="6" rx="3" fill="${palette.white}"/>`);
      }
    }

    lines.push(`<text x="${ix + padX}" y="${iy + 600}" font-family="${grot}" font-size="28" letter-spacing="5" fill="${palette.inkDim}" font-weight="700">SOUNDSCAPES</text>`);
    const sfxLabels = ['Rain', 'Thunder', 'Coffee', 'Fire', 'Train', 'Chatter', 'Wind', 'Birds', 'Ocean', 'Typing', 'Vinyl', 'City'];
    const sfxActive = [true, false, false, true, false, false, false, false, false, false, true, false];
    for (let i = 0; i < 12; i++) {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const cx0 = ix + padX + col * (cellW + 12);
      const cy0 = iy + 640 + row * (cellH + 14);
      const fill = sfxActive[i] ? palette.accent : palette.white;
      const textColor = sfxActive[i] ? palette.white : palette.ink;
      lines.push(`<rect x="${cx0}" y="${cy0}" width="${cellW}" height="${cellH}" rx="18" fill="${fill}" stroke="${palette.cardBorder}" stroke-width="1"/>`);
      lines.push(`<text x="${cx0 + cellW / 2}" y="${cy0 + cellH * 0.42}" font-family="${grot}" font-size="26" fill="${textColor}" text-anchor="middle" font-weight="600">${sfxLabels[i]}</text>`);
      lines.push(`<rect x="${cx0 + 16}" y="${cy0 + cellH - 28}" width="${cellW - 32}" height="6" rx="3" fill="${sfxActive[i] ? '#ffffff66' : palette.cardBorder}"/>`);
      if (sfxActive[i]) {
        lines.push(`<rect x="${cx0 + 16}" y="${cy0 + cellH - 28}" width="${(cellW - 32) * 0.55}" height="6" rx="3" fill="${palette.white}"/>`);
      }
    }

    return lines.join('\n        ');
  };

  return svgWrap(`
    <rect width="${W}" height="${H}" fill="${palette.cream}"/>
    ${header('MIX ANY OF 18 CHANNELS')}

    <text x="${W / 2}" y="430" font-family="${serif}" font-style="italic" font-size="120" fill="${palette.ink}" text-anchor="middle" font-weight="300">Build your atmosphere.</text>

    ${phoneMockup({ x: phoneX, y: phoneY, w: phoneW, h: phoneH, inner: phoneInner })}

    ${brandFooter()}
  `);
}

// ---------- screenshot 04 — Save mix ----------

function screenshot04() {
  const cardW = 1100;
  const cardX = (W - cardW) / 2;
  const startY = 880;

  const mixes = [
    { name: 'first chapter', subtitle: 'piano · rain · wind' },
    { name: 'shipping at 2am', subtitle: 'synthwave · rain · typing' },
    { name: 'sunday morning', subtitle: 'piano · birds · rain' },
    { name: 'lsat block', subtitle: 'lo-fi · coffee · chatter · vinyl' },
  ];

  const items = mixes.map((m, i) => {
    const y = startY + i * 200;
    return `
    <g>
      <rect x="${cardX}" y="${y}" width="${cardW}" height="170" rx="20" fill="${palette.white}" stroke="${palette.cardBorder}" stroke-width="1"/>
      <circle cx="${cardX + 80}" cy="${y + 85}" r="34" fill="${palette.accentSoft}"/>
      <text x="${cardX + 80}" y="${y + 96}" font-family="${grot}" font-size="32" fill="${palette.accent}" text-anchor="middle" font-weight="600">▶</text>
      <text x="${cardX + 150}" y="${y + 80}" font-family="${serif}" font-style="italic" font-size="46" fill="${palette.ink}" font-weight="300">${escapeText(m.name)}</text>
      <text x="${cardX + 150}" y="${y + 130}" font-family="${grot}" font-size="26" fill="${palette.inkDim}" letter-spacing="1">${escapeText(m.subtitle)}</text>
    </g>`;
  }).join('\n');

  return svgWrap(`
    <rect width="${W}" height="${H}" fill="${palette.cream}"/>
    ${header('YOUR MIXES, FOREVER')}

    <text x="${W / 2}" y="450" font-family="${serif}" font-style="italic" font-size="120" fill="${palette.ink}" text-anchor="middle" font-weight="300">Save unlimited mixes.</text>
    <text x="${W / 2}" y="620" font-family="${serif}" font-style="italic" font-size="120" fill="${palette.ink}" text-anchor="middle" font-weight="300">Yours forever.</text>

    <text x="${W / 2}" y="780" font-family="${grot}" font-size="32" fill="${palette.inkDim}" text-anchor="middle">Load them instantly. Tweak them anytime.</text>

    ${items}

    ${brandFooter()}
  `);
}

// ---------- screenshot 05 — Anti-subscription ----------

function screenshot05() {
  const rows = [
    { name: 'Calm',      price: '$69.99 / yr' },
    { name: 'Headspace', price: '$69.99 / yr' },
    { name: 'Endel',     price: '$99 / yr' },
    { name: 'Brain.fm',  price: '$99 / yr' },
  ];

  const tableW = 980;
  const tableX = (W - tableW) / 2;
  const startY = 900;
  const rowH = 130;

  const rowsSvg = rows.map((r, i) => {
    const y = startY + i * rowH;
    return `
    <g>
      <line x1="${tableX}" y1="${y + rowH}" x2="${tableX + tableW}" y2="${y + rowH}" stroke="${palette.cardBorder}" stroke-width="1"/>
      <text x="${tableX + 30}" y="${y + 80}" font-family="${grot}" font-size="44" fill="${palette.inkDim}">${escapeText(r.name)}</text>
      <text x="${tableX + tableW - 30}" y="${y + 80}" font-family="${grot}" font-size="44" fill="${palette.inkDim}" text-anchor="end" font-weight="500">${escapeText(r.price)}</text>
    </g>`;
  }).join('\n');

  const usY = startY + rows.length * rowH + 20;

  return svgWrap(`
    <rect width="${W}" height="${H}" fill="${palette.cream}"/>
    ${header('ONE PURCHASE. YOURS FOREVER.')}

    <text x="${W / 2}" y="440" font-family="${serif}" font-style="italic" font-size="160" fill="${palette.ink}" text-anchor="middle" font-weight="300">$9.99.</text>
    <text x="${W / 2}" y="610" font-family="${serif}" font-style="italic" font-size="120" fill="${palette.ink}" text-anchor="middle" font-weight="300">Once.</text>

    <text x="${W / 2}" y="780" font-family="${grot}" font-size="30" fill="${palette.inkDim}" text-anchor="middle">No subscription. No login. No ads. Ever.</text>

    ${rowsSvg}

    <!-- us row -->
    <rect x="${tableX}" y="${usY}" width="${tableW}" height="${rowH + 20}" rx="20" fill="${palette.accentSoft}"/>
    <text x="${tableX + 30}" y="${usY + 90}" font-family="${grot}" font-size="48" fill="${palette.ink}" font-weight="700">Elseware</text>
    <text x="${tableX + tableW - 30}" y="${usY + 90}" font-family="${grot}" font-size="48" fill="${palette.accent}" text-anchor="end" font-weight="700">$9.99 once</text>

    <text x="${W / 2}" y="${usY + 240}" font-family="${grot}" font-size="28" fill="${palette.inkMute}" text-anchor="middle" font-style="italic">Subscriptions are for renting your own discipline.</text>

    ${brandFooter()}
  `);
}

// ---------- screenshot 06 — The Lock-In Guarantee ----------

function screenshot06() {
  return svgWrap(`
    <rect width="${W}" height="${H}" fill="${palette.cream}"/>
    ${header('THE LOCK-IN GUARANTEE')}

    <!-- big seal -->
    <g transform="translate(${W / 2}, 760)">
      <circle cx="0" cy="0" r="280" fill="none" stroke="${palette.accent}" stroke-width="2"/>
      <circle cx="0" cy="0" r="240" fill="${palette.accentSoft}"/>
      <text x="0" y="-40" font-family="${grot}" font-size="34" letter-spacing="6" fill="${palette.accent}" text-anchor="middle" font-weight="700">SIXTY</text>
      <text x="0" y="40" font-family="${grot}" font-size="34" letter-spacing="6" fill="${palette.accent}" text-anchor="middle" font-weight="700">DAYS</text>
      <text x="0" y="100" font-family="${grot}" font-size="22" letter-spacing="3" fill="${palette.inkDim}" text-anchor="middle">money back</text>
    </g>

    <text x="${W / 2}" y="1320" font-family="${serif}" font-style="italic" font-size="110" fill="${palette.ink}" text-anchor="middle" font-weight="300">Lock in deeper, longer,</text>
    <text x="${W / 2}" y="1460" font-family="${serif}" font-style="italic" font-size="110" fill="${palette.ink}" text-anchor="middle" font-weight="300">or your money back.</text>

    <line x1="${W / 2 - 100}" y1="1560" x2="${W / 2 + 100}" y2="1560" stroke="${palette.cardBorder}" stroke-width="2"/>

    <text x="${W / 2}" y="1700" font-family="${grot}" font-size="34" fill="${palette.inkDim}" text-anchor="middle">Keep the bonuses regardless.</text>
    <text x="${W / 2}" y="1770" font-family="${grot}" font-size="34" fill="${palette.inkDim}" text-anchor="middle">We only want regulars.</text>

    <text x="${W / 2}" y="2160" font-family="${grot}" font-size="28" letter-spacing="3" fill="${palette.inkMute}" text-anchor="middle">refund@elseware.app · no questions asked</text>

    ${brandFooter()}
  `);
}

// ---------- screenshot 07 — Bonus stack ----------

function screenshot07() {
  const bonuses = [
    { title: 'Locked-In Preset Pack',  sub: '4 secret places',                           value: '$19' },
    { title: 'Lock-In Wallpapers',     sub: '12 phone wallpapers',                       value: '$12' },
    { title: '90-Minute Focus Timer',  sub: 'built into the app',                        value: '$19' },
    { title: 'Future Places',          sub: 'free forever',                              value: '$48' },
    { title: 'Founders Wall slot',     sub: 'first 1,000 only',                          value: '—' },
  ];

  const cardW = 1080;
  const cardX = (W - cardW) / 2;
  const startY = 660;
  const cardH = 200;
  const gap = 18;

  const items = bonuses.map((b, i) => {
    const y = startY + i * (cardH + gap);
    return `
    <g>
      <rect x="${cardX}" y="${y}" width="${cardW}" height="${cardH}" rx="22" fill="${palette.white}" stroke="${palette.cardBorder}" stroke-width="1"/>
      <text x="${cardX + 60}" y="${y + 90}" font-family="${grot}" font-size="44" fill="${palette.ink}" font-weight="600">${escapeText(b.title)}</text>
      <text x="${cardX + 60}" y="${y + 150}" font-family="${grot}" font-size="28" fill="${palette.inkDim}">${escapeText(b.sub)}</text>
      <text x="${cardX + cardW - 60}" y="${y + 120}" font-family="${grot}" font-size="56" fill="${palette.accent}" text-anchor="end" font-weight="700" font-variant-numeric="tabular-nums">${escapeText(b.value)}</text>
    </g>`;
  }).join('\n');

  const anchorY = startY + bonuses.length * (cardH + gap) + 80;

  return svgWrap(`
    <rect width="${W}" height="${H}" fill="${palette.cream}"/>
    ${header('THE LIFETIME UNLOCK')}

    <text x="${W / 2}" y="450" font-family="${serif}" font-style="italic" font-size="100" fill="${palette.ink}" text-anchor="middle" font-weight="300">Worth more than $147.</text>
    <text x="${W / 2}" y="580" font-family="${serif}" font-style="italic" font-size="100" fill="${palette.ink}" text-anchor="middle" font-weight="300">Yours for $9.99.</text>

    ${items}

    <text x="${W / 2}" y="${anchorY}" font-family="${grot}" font-size="32" fill="${palette.inkMute}" text-anchor="middle" font-style="italic">One purchase. Yours forever.</text>

    ${brandFooter()}
  `);
}

// ---------- screenshot 08 — Brand close ----------

function screenshot08() {
  return svgWrap(`
    <rect width="${W}" height="${H}" fill="${palette.cream}"/>

    <!-- centered single-statement screen -->
    <g transform="translate(${W / 2}, ${H / 2 - 100})">
      <text x="0" y="-200" font-family="${grot}" font-size="34" letter-spacing="10" fill="${palette.accent}" text-anchor="middle" font-weight="600">ELSEWARE</text>
      <line x1="-60" y1="-130" x2="60" y2="-130" stroke="${palette.cardBorder}" stroke-width="2"/>
      <text x="0" y="60" font-family="${serif}" font-style="italic" font-size="240" fill="${palette.ink}" text-anchor="middle" font-weight="300">lock in.</text>
      <text x="0" y="200" font-family="${grot}" font-size="34" fill="${palette.inkDim}" text-anchor="middle" letter-spacing="2">put yourself somewhere</text>
    </g>

    <text x="${W / 2}" y="${H - 240}" font-family="${grot}" font-size="28" fill="${palette.inkMute}" text-anchor="middle" letter-spacing="2">elseware.app</text>
  `);
}

// ---------- wrapper ----------

function svgWrap(body) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<!-- Generated by scripts/generate-app-store-screenshots.js. Do not edit by hand. -->
${body}
</svg>
`;
}

// ---------- main ----------

const screenshots = [
  { id: '01-hero',                fn: screenshot01 },
  { id: '02-place-gallery',       fn: screenshot02 },
  { id: '03-mixer-detail',        fn: screenshot03 },
  { id: '04-save-mix',            fn: screenshot04 },
  { id: '05-anti-subscription',   fn: screenshot05 },
  { id: '06-lock-in-guarantee',   fn: screenshot06 },
  { id: '07-bonus-stack',         fn: screenshot07 },
  { id: '08-brand-close',         fn: screenshot08 },
];

function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  // Clean prior SVGs (keep PNGs in case operator already exported).
  for (const f of fs.readdirSync(OUT_DIR).filter((n) => n.endsWith('.svg'))) {
    fs.unlinkSync(path.join(OUT_DIR, f));
  }

  for (const s of screenshots) {
    const filename = path.join(OUT_DIR, `${s.id}.svg`);
    fs.writeFileSync(filename, s.fn(), 'utf8');
    console.log(`✓ ${path.relative(ROOT, filename)}`);
  }
  console.log(`\nWrote ${screenshots.length} App Store screenshots to ${path.relative(ROOT, OUT_DIR)}/`);
}

main();
