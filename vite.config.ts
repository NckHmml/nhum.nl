import { defineConfig } from "vite";
import fs from "fs/promises";
import react from "@vitejs/plugin-react";

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
        plugins: ["styled-jsx/babel"]
      }
    })
  ],
});
