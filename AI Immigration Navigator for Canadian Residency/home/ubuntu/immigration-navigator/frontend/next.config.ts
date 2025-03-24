import { defineConfig } from "next";

export default defineConfig({
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
});
