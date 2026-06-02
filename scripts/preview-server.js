#!/usr/bin/env node
/*
 * preview-server.js
 *
 * Zero-dependency static file server for website/. Mirrors Vercel's
 * `cleanUrls` semantics so links resolve the same locally as in production.
 *
 * Usage:
 *   npm run preview
 *   # or
 *   node scripts/preview-server.js [port]
 *
 * Defaults to port 3000. Override with PORT env var or first CLI arg.
 *
 * Routes (cleanUrls):
 *   /              → website/index.html
 *   /links         → website/links.html
 *   /founders      → website/founders.html
 *   /protocol      → website/protocol.html
 *   /launch-status → website/launch-status.html
 *
 * Also serves any static asset (style.css, etc.) from website/.
 *
 * iOS auto-redirect on /links is implemented client-side, so previewing on
 * an iPhone simulator will trigger the redirect. Use ?stay=1 to bypass:
 *   http://localhost:3000/links?stay=1
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE_DIR = path.join(ROOT, 'website');

const PORT = Number(process.argv[2] || process.env.PORT || 3000);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.htm':  'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.webp': 'image/webp',
  '.ico':  'image/x-icon',
  '.txt':  'text/plain; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
  '.otf':  'font/otf',
  '.map':  'application/json; charset=utf-8',
};

function safeJoin(base, target) {
  // Resolve and ensure the result stays inside `base` (no path traversal).
  const resolved = path.resolve(base, '.' + target);
  if (resolved !== base && !resolved.startsWith(base + path.sep)) {
    return null;
  }
  return resolved;
}

function fileExists(p) {
  try {
    const st = fs.statSync(p);
    return st.isFile() ? p : null;
  } catch {
    return null;
  }
}

/**
 * Resolve a URL pathname to an actual file on disk, mimicking Vercel's
 * `cleanUrls: true` behavior. Tries:
 *   1. Exact path                 → /style.css        → website/style.css
 *   2. Append .html               → /links            → website/links.html
 *   3. Index for trailing slash   → /                 → website/index.html
 */
function resolveFile(pathname) {
  // Decode + strip query already handled by caller. Default index.
  if (pathname === '/' || pathname === '') pathname = '/index.html';

  // 1. Exact file.
  const exact = safeJoin(SITE_DIR, pathname);
  if (exact) {
    const found = fileExists(exact);
    if (found) return found;
  }

  // 2. Try with `.html`.
  if (!path.extname(pathname)) {
    const withHtml = safeJoin(SITE_DIR, pathname + '.html');
    if (withHtml) {
      const found = fileExists(withHtml);
      if (found) return found;
    }
  }

  // 3. Trailing-slash index.
  if (pathname.endsWith('/')) {
    const indexed = safeJoin(SITE_DIR, pathname + 'index.html');
    if (indexed) {
      const found = fileExists(indexed);
      if (found) return found;
    }
  }

  return null;
}

function send404(res, pathname) {
  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`<!doctype html>
<html><head><meta charset="utf-8"><title>404</title>
<style>body{font-family:system-ui;background:#f4f1ec;color:#2e2a24;padding:4rem;text-align:center}h1{font-style:italic;font-weight:300;font-size:2rem}a{color:#a688b5}</style>
</head><body>
  <h1>not here.</h1>
  <p>nothing at <code>${escapeHtml(pathname)}</code>.</p>
  <p><a href="/">elseware</a></p>
</body></html>`);
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

const server = http.createServer((req, res) => {
  const start = Date.now();
  // WHATWG URL API. Base is required because req.url is path-only.
  const parsed = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const pathname = decodeURIComponent(parsed.pathname || '/');

  const filePath = resolveFile(pathname);

  if (!filePath) {
    send404(res, pathname);
    log(req.method, pathname, 404, Date.now() - start);
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const mime = MIME[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      send404(res, pathname);
      log(req.method, pathname, 404, Date.now() - start);
      return;
    }
    res.writeHead(200, {
      'Content-Type': mime,
      'Cache-Control': 'no-cache',
    });
    res.end(data);
    log(req.method, pathname, 200, Date.now() - start);
  });
});

function log(method, pathname, status, ms) {
  const color = status >= 400 ? '\x1b[31m' : '\x1b[32m';
  const reset = '\x1b[0m';
  console.log(`  ${color}${status}${reset} ${method.padEnd(4)} ${pathname} ${ms}ms`);
}

function banner() {
  console.log('');
  console.log('  ELSEWARE preview');
  console.log('  ─────────────────────');
  console.log(`  serving website/ on http://localhost:${PORT}`);
  console.log('');
  console.log('  routes:');
  console.log(`    →  http://localhost:${PORT}/`);
  console.log(`    →  http://localhost:${PORT}/links              (use ?stay=1 to bypass iOS redirect)`);
  console.log(`    →  http://localhost:${PORT}/founders`);
  console.log(`    →  http://localhost:${PORT}/protocol`);
  console.log(`    →  http://localhost:${PORT}/launch-status`);
  console.log('');
  console.log('  ctrl+c to stop');
  console.log('');
}

server.listen(PORT, () => {
  banner();
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n  port ${PORT} is in use. try: PORT=3001 npm run preview\n`);
    process.exit(1);
  }
  console.error(err);
  process.exit(1);
});

// Clean shutdown on SIGINT/SIGTERM so ctrl+c doesn't dangle.
['SIGINT', 'SIGTERM'].forEach((sig) => {
  process.on(sig, () => {
    console.log(`\n  ${sig} received. closing.\n`);
    server.close(() => process.exit(0));
  });
});
