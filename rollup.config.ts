import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

import { nodeResolve } from "@rollup/plugin-node-resolve";
import { defineConfig } from "rollup";

export default defineConfig([
  {
    input: "src/content/dokodemo-anilist.tsx",
    output: {
      file: "dist/content/dokodemo-anilist.js",
      format: "cjs",
    },
    plugins: [
      replace({
        "process.env.NODE_ENV": JSON.stringify("production"),
        preventAssignment: true,
      }),
      typescript(),
      nodeResolve(),
      commonjs(),
    ],
  },
  {
    input: "src/background.ts",
    output: {
      file: "dist/background.js",
      format: "cjs",
    },
    plugins: [typescript(), nodeResolve()],
  },
]);
