import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import visualizer from 'rollup-plugin-visualizer';
import pkg from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
        jsxImportSource: "@emotion/react",
    }),
  ],
  build: {
    outDir: "build",
    lib: {
      entry: "./src/App.tsx",
      formats: ["cjs","es"],
      fileName: (format) => {
        const path = format === "es" ? pkg.module : pkg.main
        return path.split("/").slice(-1)[0];
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