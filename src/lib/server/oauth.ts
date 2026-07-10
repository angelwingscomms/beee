import { Google, generateState, generateCodeVerifier } from 'arctic';

export function google_client(origin: string, id: string, secret: string): Google {
  return new Google(id, secret, `${origin}/google`);
}

export { generateState, generateCodeVerifier };
