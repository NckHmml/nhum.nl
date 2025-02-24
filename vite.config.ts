import fs from "fs/promises";
import { resolve } from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      name: "umami-local",
      async buildStart() {
        // Always try get latest umami script
        // A bit cheeky, this will bypass most adblockers
        const script = await fetch("https://cloud.umami.is/script.js");
        const body = await script.blob();
        await fs.writeFile("./public/umami.js", body.stream());
      },
    },
    react({
      babel: {
        plugins: ["styled-jsx/babel"],
      },
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    coverage: {
      provider: "v8",
      include: ["src/**"],
      exclude: ["src/main.tsx"],
    },
  },
  resolve: {
    alias: [{ find: "~", replacement: resolve(__dirname, "./src") }],
  },
  server: {
    port: 3000,
  },
});
