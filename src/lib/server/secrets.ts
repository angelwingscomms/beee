import { env as dyn } from '$env/dynamic/private';

let _platform: App.Platform | null = null;

export function set_platform(p: App.Platform | undefined | null) {
  _platform = p ?? null;
}

export async function get_secret(k: string): Promise<string> {
  console.log('[secrets] get_secret called for:', k);
  console.log('[secrets] platform present:', !!_platform, '| platform.env present:', !!(_platform?.env));
  const b = (_platform?.env as any)?.[k];
  console.log('[secrets] binding present:', !!b, '| binding has .get:', !!(b?.get));
  if (b?.get) {
    try {
      const v = await b.get();
      console.log('[secrets] retrieved from secrets store binding for:', k, 'result:', v ? (k.includes('SECRET') || k.includes('PASSWORD') ? '***' : v.slice(0, 20) + '...') : 'EMPTY');
      return v ?? '';
    } catch (e) {
      console.warn('[secrets] secrets store binding .get() threw:', e);
    }
  }
  const v = (dyn as Record<string, string>)[k];
  console.log('[secrets] dyn env value for:', k, typeof v === 'string' ? 'present (' + (k.includes('SECRET') || k === 'GOOGLE_SECRET' ? '***' : v.slice(0, 20) + '...') + ')' : 'absent');
  if (typeof v === 'string') return v;
  console.warn('[secrets] no value found for:', k, 'returning empty string');
  return '';
}
