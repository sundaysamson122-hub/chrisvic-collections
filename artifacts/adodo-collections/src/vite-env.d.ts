interface ImportMetaEnv {
  readonly [key: string]: string | boolean | undefined;
  readonly BASE_URL?: string;
  readonly DEV?: boolean;
  readonly VITE_CLERK_PROXY_URL?: string;
  readonly VITE_CLERK_PUBLISHABLE_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}