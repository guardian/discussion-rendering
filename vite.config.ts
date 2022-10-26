import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import visualizer from 'rollup-plugin-visualizer';
import pkg from './package.json';

/** Get build directory from package.json */
const outDir = pkg.module.split("/")[0];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
        jsxImportSource: "@emotion/react",
        jsxRuntime: 'classic',
    }),
  ],
  build: {
    outDir,
    minify: false,
    lib: {
      entry: "./src/App.tsx",
      formats: ["cjs","es"],
      fileName: (format) => {
        // Ensure the file names matches the package.json’s ones
        const path = format === "es" ? pkg.module : pkg.main
        // Strip out the build directory from the filename
        return path.replace(`${outDir}/`, "");
      },
    },
    rollupOptions: 
      {
        input: './src/App.tsx',
        external: [
          // Ignore all dependencies and PeerDependencies in build
          ...Object.keys(pkg.peerDependencies || {}),
          'prop-types',
        ],
        plugins: [
          //@ts-expect-error -- it works
          visualizer({ filename: 'build/stats.html' }),
        ],
    },
  }
});