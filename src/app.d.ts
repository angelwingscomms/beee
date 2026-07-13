interface SecretsStoreSecret {
  get(): Promise<string>;
}

interface SecretsStoreEnv {
  GOOGLE_ID: SecretsStoreSecret;
  GOOGLE_SECRET: SecretsStoreSecret;
  SECRET: SecretsStoreSecret;
  PAYSTACK_TEST: SecretsStoreSecret;
  PAYSTACK_SECRET_KEY_TEST: SecretsStoreSecret;
  PAYSTACK_SECRET_KEY_LIVE: SecretsStoreSecret;
  QDRANT_KEY: SecretsStoreSecret;
  QDRANT_URL: SecretsStoreSecret;
  GEMINI: SecretsStoreSecret;
  PASSWORD: SecretsStoreSecret;
  [key: string]: unknown;
}

declare global {
  namespace App {
    interface Locals {
      user: { id: string; name?: string; picture?: string; email?: string } | null;
    }
    interface Platform {
      env: SecretsStoreEnv;
    }
    interface PageState {
      partner?: boolean;
    }
  }
}
export {};
