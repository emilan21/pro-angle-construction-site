import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://proangleconstructionpa.com",
  output: "static",
  build: { assets: "assets", inlineStylesheets: "auto" },
  compressHTML: true,
});

