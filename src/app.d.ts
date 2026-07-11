interface SecretsStoreSecret {
  get(): Promise<string>;
}

interface SecretsStoreEnv {
  GOOGLE_ID: SecretsStoreSecret;
  GOOGLE_SECRET: SecretsStoreSecret;
  SECRET: SecretsStoreSecret;
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
