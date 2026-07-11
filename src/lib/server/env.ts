import * as _env from '$env/dynamic/private';

export async function env_val(env: Record<string, any> | undefined, k: string): Promise<string> {
  const v = env?.[k];
  if (!v) {
    const f = _env.env[k] ?? '';
    console.log('full _env', _env);
    return f;
  }
  return typeof v === 'string' ? v : await v.get();
}
