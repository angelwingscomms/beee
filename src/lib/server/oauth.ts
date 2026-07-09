import { Google, generateState, generateCodeVerifier } from 'arctic';
import { GOOGLE_ID, GOOGLE_SECRET } from '$env/static/private';

export function google_client(origin: string): Google {
  return new Google(GOOGLE_ID, GOOGLE_SECRET, `${origin}/google`);
}

export { generateState, generateCodeVerifier };
