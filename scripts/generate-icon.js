// Generate app icon as SVG, then we'll use a different approach to convert
const fs = require('fs');
const path = require('path');

const size = 1024;
const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="${size}" height="${size}" rx="224" fill="#f4f1ec"/>

  <!-- Subtle gradient overlay -->
  <defs>
    <radialGradient id="glow" cx="50%" cy="45%" r="50%">
      <stop offset="0%" stop-color="#e8ddef" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#f4f1ec" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="70%" cy="70%" r="40%">
      <stop offset="0%" stop-color="#f0c8a8" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#f4f1ec" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="224" fill="url(#glow)"/>
  <rect width="${size}" height="${size}" rx="224" fill="url(#glow2)"/>

  <!-- Sound wave ripples (centered, matching ambient icon aesthetic) -->
  <g transform="translate(512, 460)" fill="none" stroke="#a688b5" stroke-linecap="round">
    <!-- Inner circle -->
    <circle cx="0" cy="0" r="60" stroke-width="14"/>
    <!-- Ripple 1 -->
    <path d="M0 -120 a120 120 0 0 1 0 240" stroke-width="12" opacity="0.8"/>
    <path d="M0 -120 a120 120 0 0 0 0 240" stroke-width="12" opacity="0.8"/>
    <!-- Ripple 2 -->
    <path d="M0 -190 a190 190 0 0 1 0 380" stroke-width="10" opacity="0.55"/>
    <path d="M0 -190 a190 190 0 0 0 0 380" stroke-width="10" opacity="0.55"/>
    <!-- Ripple 3 -->
    <path d="M0 -260 a260 260 0 0 1 0 520" stroke-width="8" opacity="0.3"/>
    <path d="M0 -260 a260 260 0 0 0 0 520" stroke-width="8" opacity="0.3"/>
  </g>

  <!-- ELSEWARE text at bottom -->
  <text x="512" y="840" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="72" font-weight="300" letter-spacing="12" fill="#2e2a24">
    <tspan fill="#a688b5" font-weight="400">ELSE</tspan>WARE
  </text>
</svg>`;

// Write SVG
const svgPath = path.join(__dirname, '..', 'assets', 'icon.svg');
fs.writeFileSync(svgPath, svg);
console.log('SVG icon written to', svgPath);

// Also generate a simpler splash icon SVG
const splashSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(100, 90)" fill="none" stroke="#a688b5" stroke-linecap="round">
    <circle cx="0" cy="0" r="12" stroke-width="3"/>
    <path d="M0 -24 a24 24 0 0 1 0 48" stroke-width="2.5" opacity="0.8"/>
    <path d="M0 -24 a24 24 0 0 0 0 48" stroke-width="2.5" opacity="0.8"/>
    <path d="M0 -40 a40 40 0 0 1 0 80" stroke-width="2" opacity="0.55"/>
    <path d="M0 -40 a40 40 0 0 0 0 80" stroke-width="2" opacity="0.55"/>
    <path d="M0 -56 a56 56 0 0 1 0 112" stroke-width="1.5" opacity="0.3"/>
    <path d="M0 -56 a56 56 0 0 0 0 112" stroke-width="1.5" opacity="0.3"/>
  </g>
  <text x="100" y="170" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="16" font-weight="300" letter-spacing="3" fill="#2e2a24">
    <tspan fill="#a688b5" font-weight="400">ELSE</tspan>WARE
  </text>
</svg>`;

const splashSvgPath = path.join(__dirname, '..', 'assets', 'splash-icon.svg');
fs.writeFileSync(splashSvgPath, splashSvg);
console.log('Splash SVG written to', splashSvgPath);
