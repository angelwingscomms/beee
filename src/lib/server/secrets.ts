import { env as dyn } from '$env/dynamic/private';

let _platform: App.Platform | null = null;

export function set_platform(p: App.Platform | undefined | null) {
  _platform = p ?? null;
}

export async function get_secret(k: string): Promise<string> {
  const b = (_platform?.env as any)?.[k];
  if (b?.get) {
    try { return await b.get(); } catch {}
  }
  const v = (dyn as Record<string, string>)[k];
  if (typeof v === 'string') return v;
  return '';
}
