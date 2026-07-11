import { describe, expect, it } from 'vitest';
import { env_val } from '$lib/server/env';

describe('env_val', () => {
  it('returns empty string when env is undefined', async () => {
    expect(await env_val(undefined, 'SECRET')).toBe('');
  });

  it('returns empty string when key missing', async () => {
    expect(await env_val({}, 'SECRET')).toBe('');
  });

  it('returns plain string (local dev .dev.vars)', async () => {
    expect(await env_val({ SECRET: 'abc' }, 'SECRET')).toBe('abc');
  });

  it('calls .get() on secrets-store binding (production)', async () => {
    const binding = { get: async () => 'prod-secret' };
    expect(await env_val({ SECRET: binding }, 'SECRET')).toBe('prod-secret');
  });
});
