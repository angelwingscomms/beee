export async function env_val(env: Record<string, any> | undefined, k: string): Promise<string> {
  const v = env?.[k];
  if (!v) return '';
  return typeof v === 'string' ? v : await v.get();
}
