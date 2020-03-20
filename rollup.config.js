import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

const extensions = [".ts", ".tsx"];

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
    "react",
    "react-dom",
    "@emotion/core",
    "@emotion/css",
    "@guardian/src-foundations",
    "@guardian/src-foundations/accessibility",
    "@guardian/src-foundations/palette",
    "@guardian/src-foundations/themes",
    "@guardian/src-foundations/typography",
    "prop-types"
  ],
  plugins: [babel({ extensions }), resolve({ extensions }), commonjs()]
};
