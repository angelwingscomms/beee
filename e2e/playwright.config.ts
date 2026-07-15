import { defineConfig, devices } from '@playwright/test';

const MOCK_PORT = 8788;
const DEV_PORT = 5400;

export default defineConfig({
  testDir: './e2e',
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
      command: 'node e2e/paystack-mock.mjs',
      port: MOCK_PORT,
      reuseExistingServer: true,
      stdout: 'ignore',
      stderr: 'pipe',
      env: { PAYSTACK_MOCK_PORT: String(MOCK_PORT), SECRET: 'test-secret-key' },
    },
    {
      command: 'npm run dev',
      port: DEV_PORT,
      reuseExistingServer: true,
      timeout: 120_000,
      env: {
        PAYSTACK_BASE_URL: `http://localhost:${MOCK_PORT}`,
        SECRET: 'test-secret-key',
        PAYSTACK_SECRET_KEY_TEST: 'test-secret-key',
        PAYSTACK_SECRET_KEY_LIVE: 'sk_live_test',
      },
    },
  ],
});
