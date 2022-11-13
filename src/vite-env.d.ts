/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NARRATIVE_API_KEY: string;
  readonly VITE_FAKE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
