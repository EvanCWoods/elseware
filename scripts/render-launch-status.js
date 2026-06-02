#!/usr/bin/env node
/*
 * render-launch-status.js
 *
 * Reads scripts/launch-status.json and rewrites the data-status="..."
 * slots in website/launch-status.html. Idempotent — safe to run any
 * number of times.
 *
 * Usage:
 *   node scripts/render-launch-status.js
 *
 * The dashboard at elseware.app/launch-status is the public "build-in-public"
 * amplifier. Every number visible on it is honest. Update the JSON, run
 * this script, commit, push. Vercel auto-deploys.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const JSON_PATH = path.join(ROOT, 'scripts', 'launch-status.json');
const HTML_PATH = path.join(ROOT, 'website', 'launch-status.html');

function read(file) { return fs.readFileSync(file, 'utf8'); }
function write(file, contents) { fs.writeFileSync(file, contents, 'utf8'); }

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function fmtNumber(n) {
  return Number(n).toLocaleString('en-US');
}

function fmtPrice(n) {
  // Strip trailing zeros only if integer (e.g. 14.00 -> 14, but 9.99 stays).
  const num = Number(n);
  return Number.isInteger(num) ? String(num) : num.toFixed(2);
}

/**
 * Replace a simple text slot — `data-status="key">…<`.
 * Operates on the first occurrence. Caller passes already-escaped value.
 */
function setText(html, key, value) {
  const re = new RegExp(`(data-status="${key}"[^>]*>)([^<]*)(<)`, 'g');
  return html.replace(re, `$1${value}$3`);
}

/**
 * Replace a width-style slot — sets the inline style="width: X%".
 */
function setWidth(html, key, percent) {
  const re = new RegExp(`(data-status="${key}"[^>]*style=")[^"]*(")`, 'g');
  return html.replace(re, `$1width: ${percent}%$2`);
}

/**
 * Replace a list slot — `<ul ... data-status="key">…</ul>` block contents.
 */
function setList(html, key, itemsHtml) {
  const re = new RegExp(`(<ul[^>]*data-status="${key}"[^>]*>)([\\s\\S]*?)(</ul>)`, 'g');
  return html.replace(re, `$1\n${itemsHtml}\n        $3`);
}

function listItems(items, formatter) {
  return items.map((it) => `          ${formatter(it)}`).join('\n');
}

function loadStatus() {
  const raw = read(JSON_PATH);
  const data = JSON.parse(raw);
  validate(data);
  return data;
}

function validate(data) {
  if (!data.as_of || typeof data.as_of !== 'string') {
    throw new Error('launch-status.json: as_of (YYYY-MM-DD) is required');
  }
  if (!data.counters) throw new Error('launch-status.json: counters{} is required');
  const c = data.counters;
  if (typeof c.cumulative_unlocks !== 'number' || c.cumulative_unlocks < 0) {
    throw new Error('counters.cumulative_unlocks must be a non-negative number');
  }
  if (typeof c.founders_named !== 'number' || c.founders_named < 0) {
    throw new Error('counters.founders_named must be a non-negative number');
  }
  if (c.founders_named > c.founders_cap) {
    throw new Error(`counters.founders_named (${c.founders_named}) exceeds founders_cap (${c.founders_cap})`);
  }
  if (typeof c.price_ladder_threshold !== 'number' || c.price_ladder_threshold <= 0) {
    throw new Error('counters.price_ladder_threshold must be > 0');
  }
}

function render(data) {
  const c = data.counters;
  const unlocks = c.cumulative_unlocks;
  const threshold = c.price_ladder_threshold;
  const remaining = Math.max(0, threshold - unlocks);
  const fillPct = Math.min(100, Math.max(0, (unlocks / threshold) * 100));
  const fillStr = fillPct.toFixed(1);

  let html = read(HTML_PATH);

  // Header / metadata
  html = setText(html, 'as_of', escapeHtml(data.as_of));
  html = setText(html, 'as_of_foot', escapeHtml(data.as_of));
  html = setText(html, 'phase', escapeHtml(data.phase || ''));
  html = setText(html, 'now', escapeHtml(data.now_working_on || ''));

  // Counters
  html = setText(html, 'unlocks', fmtNumber(unlocks));
  html = setText(html, 'unlocks_inline', fmtNumber(unlocks));
  html = setText(html, 'unlocks_remaining', fmtNumber(remaining));
  html = setText(html, 'founders_named', fmtNumber(c.founders_named));
  html = setText(html, 'founders_cap', fmtNumber(c.founders_cap));
  html = setText(html, 'current_price', fmtPrice(c.current_price_usd));
  html = setText(html, 'current_price_inline', fmtPrice(c.current_price_usd));
  html = setText(html, 'next_price', fmtPrice(c.next_price_usd));
  html = setText(html, 'next_price_inline', fmtPrice(c.next_price_usd));
  html = setText(html, 'ladder_threshold', fmtNumber(threshold));
  html = setText(html, 'ladder_threshold_inline', fmtNumber(threshold));

  // Price-ladder fill
  html = setWidth(html, 'ladder_fill_style', fillStr);

  // Roadmap — shipped (strings)
  const shipped = (data.roadmap?.shipped || []).map((s) => `<li class="roadmap-item shipped">${escapeHtml(s)}</li>`);
  html = setList(html, 'roadmap_shipped', listItems(shipped, (x) => x));

  // Roadmap — in progress (strings)
  const inProgress = (data.roadmap?.in_progress || []).map((s) => `<li class="roadmap-item in-progress">${escapeHtml(s)}</li>`);
  html = setList(html, 'roadmap_in_progress', listItems(inProgress, (x) => x));

  // Roadmap — next quarters (objects with date+item)
  const next = (data.roadmap?.next_quarter || []).map((n) => {
    const date = n.date ? `<span class="roadmap-date">${escapeHtml(n.date)}</span>` : '';
    return `<li class="roadmap-item next">${date}${escapeHtml(n.item || '')}</li>`;
  });
  html = setList(html, 'roadmap_next', listItems(next, (x) => x));

  // Commitments
  const commitments = (data.commitments || []).map((cm) => `
            <li>
              <span class="commitment-label">${escapeHtml(cm.label)}</span>
              <span class="commitment-trigger"><em>${escapeHtml(cm.trigger)}</em> — ${escapeHtml(cm.consequence)}</span>
            </li>`);
  html = setList(html, 'commitments', commitments.join(''));

  // Don't-do
  const donts = (data.what_we_dont_do || []).map((s) => `<li>${escapeHtml(s)}</li>`);
  html = setList(html, 'dont_do', listItems(donts, (x) => x));

  return html;
}

function main() {
  const data = loadStatus();
  const html = render(data);
  write(HTML_PATH, html);

  const c = data.counters;
  console.log(`✓ Rendered launch-status.html`);
  console.log(`  as of:    ${data.as_of}`);
  console.log(`  unlocks:  ${fmtNumber(c.cumulative_unlocks)} / ${fmtNumber(c.price_ladder_threshold)}`);
  console.log(`  founders: ${fmtNumber(c.founders_named)} / ${fmtNumber(c.founders_cap)}`);
  console.log(`  phase:    ${data.phase}`);
}

main();
