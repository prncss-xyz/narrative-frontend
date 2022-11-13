import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.PORT) ?? 5173,
  },
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
  ],
  test: {
    coverage: {
      provider: "istanbul",
    },
    environment: "jsdom",
    globals: true,
  },
});
