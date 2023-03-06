import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";

export default {
  input: "src/main.js",
  output: {
    dir: "dist",
    format: "es",
  },
  plugins: [nodeResolve(), commonjs(), json()],
};
