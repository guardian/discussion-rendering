import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

const extensions = [".ts", ".tsx"];

module.exports = {
  input: "./src/components/Comments/Comments.tsx",
  output: [
    {
      file: "dist/comments.js",
      format: "cjs"
    },
    {
      file: "dist/comments.esm.js",
      format: "esm"
    }
  ],
  external: [
    "react",
    "@emotion/core",
    "@emotion/css",
    "@guardian/src-foundations",
    "@guardian/src-foundations/accessibility",
    "@guardian/src-foundations/palette",
    "@guardian/src-foundations/themes",
    "@guardian/src-foundations/typography"
  ],
  plugins: [babel({ extensions }), resolve({ extensions }), commonjs()]
};
