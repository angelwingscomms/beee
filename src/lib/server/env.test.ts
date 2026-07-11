import { describe, expect, it } from 'vitest';
import { env_val } from '$lib/server/env';
import { env } from '$env/dynamic/private';

describe('env_val', () => {
  it('falls back to $env/dynamic/private when env is undefined', async () => {
    expect(await env_val(undefined, 'SECRET')).toBe(env.SECRET ?? '');
  });

  it('returns empty string when key missing in both', async () => {
    expect(await env_val({}, 'NO_SUCH_KEY_XYZ')).toBe('');
  });

  it('returns plain string (local dev .dev.vars)', async () => {
    expect(await env_val({ SECRET: 'abc' }, 'SECRET')).toBe('abc');
  });

  it('calls .get() on secrets-store binding (production)', async () => {
    const binding = { get: async () => 'prod-secret' };
    expect(await env_val({ SECRET: binding }, 'SECRET')).toBe('prod-secret');
  });
});
