#!/usr/bin/env node
/*
 * sync-analytics.js
 *
 * Pulls live counters into scripts/launch-status.json so the Friday update
 * is a one-command job:
 *
 *   1. Cumulative unlocks ← RevenueCat REST API v2 (counts customers with
 *      the `pro` entitlement currently active).
 *   2. Founders named ← length of scripts/founders.json `founders[]`.
 *   3. as_of ← today (YYYY-MM-DD).
 *
 * Usage:
 *   node scripts/sync-analytics.js              # pull live data
 *   node scripts/sync-analytics.js --dry-run    # show what would change
 *   node scripts/sync-analytics.js --unlocks=N  # override unlocks (e.g.
 *                                                  for announcements when
 *                                                  the API is down)
 *   node scripts/sync-analytics.js --now=TEXT   # set now_working_on too
 *
 * Required env vars (set in a .env.local that's gitignored, or your shell):
 *   REVENUECAT_SECRET_KEY  — secret key from RevenueCat → Project Settings →
 *                            API keys → "Secret API key" (NOT the public
 *                            SDK key in src/config/constants.ts).
 *   REVENUECAT_PROJECT_ID  — project ID from RevenueCat → Project Settings.
 *
 * If env vars are missing, the script falls back to:
 *   - Updating only founders count + as_of date.
 *   - Printing a clear message about how to wire RevenueCat.
 *   - Exit code 0 (the partial sync still landed something useful).
 *
 * After running, run `npm run render:status` to push the JSON into the HTML.
 * Or run `npm run friday` to do both in one shot.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const STATUS_PATH = path.join(ROOT, 'scripts', 'launch-status.json');
const FOUNDERS_PATH = path.join(ROOT, 'scripts', 'founders.json');

const RC_BASE = 'https://api.revenuecat.com/v2';
const RC_PAGE_LIMIT = 1000; // RC allows up to 1000 per page

// ---------- arg parsing ----------

function parseArgs(argv) {
  const out = { dryRun: false, unlocksOverride: null, now: null };
  for (const a of argv.slice(2)) {
    if (a === '--dry-run') out.dryRun = true;
    else if (a.startsWith('--unlocks=')) out.unlocksOverride = Number(a.slice('--unlocks='.length));
    else if (a.startsWith('--now=')) out.now = a.slice('--now='.length);
    else throw new Error(`Unknown arg: ${a}`);
  }
  if (out.unlocksOverride !== null && !Number.isFinite(out.unlocksOverride)) {
    throw new Error(`--unlocks must be a number`);
  }
  return out;
}

// ---------- file IO ----------

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function writeJson(p, data) {
  // Preserve readability: 2-space indent + trailing newline.
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

function todayIso() {
  const d = new Date();
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// ---------- founders count ----------

function countFounders() {
  try {
    const data = readJson(FOUNDERS_PATH);
    if (!Array.isArray(data.founders)) return 0;
    return data.founders.length;
  } catch (e) {
    console.warn(`  ! could not read founders.json: ${e.message}`);
    return null;
  }
}

// ---------- RevenueCat ----------

async function fetchRevenueCatUnlocks() {
  const key = process.env.REVENUECAT_SECRET_KEY;
  const projectId = process.env.REVENUECAT_PROJECT_ID;

  if (!key || !projectId) {
    return { ok: false, reason: 'env_missing' };
  }
  if (typeof fetch !== 'function') {
    return { ok: false, reason: 'fetch_unavailable', detail: 'Node 18+ required for global fetch' };
  }

  const headers = {
    Authorization: `Bearer ${key}`,
    Accept: 'application/json',
  };

  // Strategy: list all customers with active entitlement `pro`. RC paginates.
  // We sum the count across pages.
  let total = 0;
  let starting_after = null;
  let pages = 0;
  const maxPages = 100; // safety stop at 100k customers

  while (pages < maxPages) {
    const params = new URLSearchParams({ limit: String(RC_PAGE_LIMIT) });
    if (starting_after) params.set('starting_after', starting_after);

    const url = `${RC_BASE}/projects/${encodeURIComponent(projectId)}/entitlements/pro/customers?${params}`;

    let res;
    try {
      res = await fetch(url, { headers });
    } catch (e) {
      return { ok: false, reason: 'network_error', detail: e.message };
    }

    if (res.status === 401 || res.status === 403) {
      return { ok: false, reason: 'auth_error', detail: `${res.status} ${res.statusText}` };
    }
    if (res.status === 404) {
      // Either project_id is wrong, or this RC tenant uses a different endpoint shape.
      return { ok: false, reason: 'endpoint_not_found', detail: `404 on ${url}` };
    }
    if (!res.ok) {
      return { ok: false, reason: 'http_error', detail: `${res.status} ${res.statusText}` };
    }

    let body;
    try {
      body = await res.json();
    } catch {
      return { ok: false, reason: 'bad_json' };
    }

    const items = Array.isArray(body.items) ? body.items : Array.isArray(body.data) ? body.data : [];
    total += items.length;
    pages += 1;

    const next = body.next_page || body.next_cursor || null;
    if (!next || items.length < RC_PAGE_LIMIT) break;
    starting_after = next;
  }

  return { ok: true, total, pages };
}

// ---------- main flow ----------

function diff(prev, next) {
  const pairs = [];
  if (prev.cumulative_unlocks !== next.cumulative_unlocks) {
    pairs.push(`unlocks ${prev.cumulative_unlocks} → ${next.cumulative_unlocks}`);
  }
  if (prev.founders_named !== next.founders_named) {
    pairs.push(`founders ${prev.founders_named} → ${next.founders_named}`);
  }
  return pairs;
}

async function main() {
  const args = parseArgs(process.argv);

  const status = readJson(STATUS_PATH);
  const before = {
    as_of: status.as_of,
    cumulative_unlocks: status.counters.cumulative_unlocks,
    founders_named: status.counters.founders_named,
  };

  // Founders — always.
  const foundersCount = countFounders();

  // Unlocks — RC API or override or skip.
  let unlocks = null;
  let rcDetail = '';
  if (args.unlocksOverride !== null) {
    unlocks = args.unlocksOverride;
    rcDetail = `manual override: --unlocks=${args.unlocksOverride}`;
  } else {
    const result = await fetchRevenueCatUnlocks();
    if (result.ok) {
      unlocks = result.total;
      rcDetail = `pulled from RevenueCat (${result.pages} page${result.pages === 1 ? '' : 's'})`;
    } else {
      rcDetail = `skipped — ${result.reason}${result.detail ? `: ${result.detail}` : ''}`;
    }
  }

  // Build next state.
  const next = {
    ...status,
    as_of: todayIso(),
    counters: {
      ...status.counters,
      ...(foundersCount !== null && { founders_named: foundersCount }),
      ...(unlocks !== null && { cumulative_unlocks: unlocks }),
    },
    ...(args.now && { now_working_on: args.now }),
  };

  // Validate the founders cap.
  if (next.counters.founders_named > next.counters.founders_cap) {
    console.error(`  ✗ founders_named (${next.counters.founders_named}) exceeds founders_cap (${next.counters.founders_cap}). aborting.`);
    process.exit(1);
  }

  // Report.
  console.log('');
  console.log('  ELSEWARE analytics sync');
  console.log('  ─────────────────────────');
  console.log(`  date:     ${next.as_of}`);
  console.log(`  unlocks:  ${next.counters.cumulative_unlocks}  (${rcDetail})`);
  console.log(`  founders: ${next.counters.founders_named}  (from founders.json)`);
  if (args.now) console.log(`  now:      "${args.now}"`);

  const changes = diff(before, {
    cumulative_unlocks: next.counters.cumulative_unlocks,
    founders_named: next.counters.founders_named,
  });
  if (changes.length) {
    console.log(`  changes:  ${changes.join(', ')}`);
  } else if (before.as_of !== next.as_of) {
    console.log(`  changes:  date only (${before.as_of} → ${next.as_of})`);
  } else {
    console.log(`  changes:  none`);
  }

  if (args.dryRun) {
    console.log('');
    console.log('  --dry-run: not writing to disk.');
    console.log('');
    return;
  }

  writeJson(STATUS_PATH, next);

  console.log('');
  console.log('  ✓ wrote scripts/launch-status.json');
  console.log('');
  console.log('  next: npm run render:status   (or npm run friday for the full flow)');
  console.log('');
}

main().catch((err) => {
  console.error('  ✗ sync failed:', err.message);
  process.exit(1);
});
