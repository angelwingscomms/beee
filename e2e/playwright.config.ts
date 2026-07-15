import { defineConfig, devices } from '@playwright/test';
import { resolve } from 'node:path';
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { loadEnv } from './env.mjs';

const ROOT = process.cwd();
const ENV = loadEnv();
const MOCK_PORT = 8788;
const DEV_PORT = 5400;
const WEBHOOK_SECRET = ENV.PAYSTACK_SECRET_KEY_TEST || 'test-secret-key';

// Vite loads .env / .env.local (not arbitrary process env), so point the dev
// server at the mock Paystack via a gitignored .env.local.
const envLocal = resolve(ROOT, '.env.local');
let envLocalContent = existsSync(envLocal) ? readFileSync(envLocal, 'utf8') : '';
if (!/^\s*PAYSTACK_BASE_URL=/m.test(envLocalContent)) {
  envLocalContent += `\nPAYSTACK_BASE_URL=http://localhost:${MOCK_PORT}\n`;
  writeFileSync(envLocal, envLocalContent);
}

export default defineConfig({
  testDir: '.',
  testMatch: /.*\.spec\.ts/,
  fullyParallel: false,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: `http://localhost:${DEV_PORT}`,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: [
    {
      command: `node ${ROOT}/e2e/paystack-mock.mjs`,
      port: MOCK_PORT,
      cwd: ROOT,
      reuseExistingServer: false,
      stdout: 'ignore',
      stderr: 'pipe',
      env: { PAYSTACK_MOCK_PORT: String(MOCK_PORT), SECRET: WEBHOOK_SECRET },
    },
    {
      command: 'npm run dev',
      port: DEV_PORT,
      cwd: ROOT,
      reuseExistingServer: false,
      timeout: 120_000,
      env: {
        PAYSTACK_BASE_URL: `http://localhost:${MOCK_PORT}`,
        SECRET: WEBHOOK_SECRET,
      },
    },
  ],
});
