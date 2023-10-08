#!/usr/bin/env bun
/// <reference types="bun-types" />

const result = await Bun.build({
  entrypoints: ["./src/content/dokodemo-anilist.tsx", "./src/background.ts"],
  outdir: "./dist",
  define: {
    "process.env.NODE_ENV": JSON.stringify("development"),
  },
});

console.log("logs:", result.logs);

if (!result.success) {
  process.exit(1);
}
