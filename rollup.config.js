import pkg from "./package.json";
import clear from "rollup-plugin-clear";
import resolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import visualizer from "rollup-plugin-visualizer";

module.exports = {
  input: "./src/App.tsx",
  output: [
    {
      file: "build/App.js",
      format: "cjs"
    },
    {
      file: "build/App.esm.js",
      format: "esm"
    }
  ],
  external: [
    // Ignore all dependencies and PeerDependencies in build
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
    // Src Foundations nested externals
    "@guardian/src-foundations/typography",
    "@guardian/src-foundations/mq",
    "@guardian/src-foundations/palette",
    "prop-types"
  ],
  plugins: [
    clear({
      targets: ["build/"]
    }),
    resolve({ extensions: [".ts", ".tsx"] }),
    typescript({
      typescript: require("typescript")
    }),
    commonjs(),
    visualizer({ filename: "build/stats.html" })
  ]
};
