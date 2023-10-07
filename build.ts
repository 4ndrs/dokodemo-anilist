#!/usr/bin/env bun
/// <reference types="bun-types" />

await Bun.build({
  entrypoints: ["./src/content/dokodemo-anilist.tsx", "./src/background.ts"],
  outdir: "./dist",
});
