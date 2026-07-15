import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Minimal .env reader so the mock server and the e2e specs sign webhooks with
// the SAME secret the dev server actually uses (loaded from .env by Vite).
// Resolves .env from the project root (CWD when Playwright is invoked there).
export function loadEnv() {
  const p = resolve(process.cwd(), '.env');
  const out = {};
  try {
    const txt = readFileSync(p, 'utf8');
    for (const line of txt.split('\n')) {
      const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*?)\s*$/);
      if (m && !/^#/.test(line)) out[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  } catch {
    /* no .env — callers fall back to defaults */
  }
  return out;
}
