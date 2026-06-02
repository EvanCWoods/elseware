#!/usr/bin/env node
/*
 * render-founders.js
 *
 * Reads scripts/founders.json and writes the founder list, count, and date
 * into website/founders.html. Idempotent: runs cleanly any number of times.
 *
 * Usage:
 *   node scripts/render-founders.js
 *
 * Adding a founder:
 *   Edit scripts/founders.json -> founders[]:
 *     { "handle": "@evanwoods", "platform": "ig", "unlocked_at": "2026-04-29" }
 *
 *   Then run this script. Commit the resulting HTML.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const JSON_PATH = path.join(ROOT, 'scripts', 'founders.json');
const HTML_PATH = path.join(ROOT, 'website', 'founders.html');
const FOUNDERS_CAP = 1000;

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function write(file, contents) {
  fs.writeFileSync(file, contents, 'utf8');
}

function loadFounders() {
  const raw = read(JSON_PATH);
  const data = JSON.parse(raw);
  if (!Array.isArray(data.founders)) {
    throw new Error('founders.json: expected `founders` array');
  }
  return data.founders;
}

function normalize(founder) {
  if (typeof founder === 'string') return { handle: founder };
  if (!founder || typeof founder.handle !== 'string') {
    throw new Error(`Invalid founder entry: ${JSON.stringify(founder)}`);
  }
  return founder;
}

function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function render(founders) {
  const sorted = [...founders]
    .map(normalize)
    .map((f) => f.handle.trim())
    .filter(Boolean)
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  if (sorted.length > FOUNDERS_CAP) {
    throw new Error(`Founders list exceeds cap of ${FOUNDERS_CAP}: ${sorted.length}`);
  }

  const items = sorted.map((h) => `        <li>${escapeHtml(h)}</li>`).join('\n');
  const today = new Date().toISOString().slice(0, 10);

  return { items, count: sorted.length, today };
}

function rewriteHtml({ items, count, today }) {
  let html = read(HTML_PATH);

  // 1. Date span
  html = html.replace(
    /<span class="founders-date">[^<]*<\/span>/,
    `<span class="founders-date">${today}</span>`,
  );

  // 2. Count strong
  html = html.replace(
    /<strong class="founders-count">[^<]*<\/strong>/,
    `<strong class="founders-count">${count}</strong>`,
  );

  // 3. Empty-state paragraph (show only when count=0)
  if (count === 0) {
    html = html.replace(
      /<p class="founders-empty"[^>]*>[\s\S]*?<\/p>/,
      `<p class="founders-empty">Names will appear here as we add them. Lifetime unlocks have just opened.</p>`,
    );
  } else {
    // hide the empty paragraph when we have founders
    html = html.replace(
      /<p class="founders-empty"[^>]*>[\s\S]*?<\/p>/,
      `<p class="founders-empty" hidden>Names will appear here as we add them. Lifetime unlocks have just opened.</p>`,
    );
  }

  // 4. List items — replace everything between the marker comment and the </ul>
  const listBlock = items
    ? `<ul class="founders-list">\n${items}\n      </ul>`
    : `<ul class="founders-list">\n        <!-- Founder handles get added here, alphabetical by handle. Format: <li>@handle</li> -->\n      </ul>`;

  html = html.replace(
    /<ul class="founders-list">[\s\S]*?<\/ul>/,
    listBlock,
  );

  return html;
}

function main() {
  const founders = loadFounders();
  const rendered = render(founders);
  const html = rewriteHtml(rendered);
  write(HTML_PATH, html);
  console.log(`✓ Rendered ${rendered.count} founder${rendered.count === 1 ? '' : 's'} to ${path.relative(ROOT, HTML_PATH)} (${rendered.today})`);
}

main();
