import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import visualizer from 'rollup-plugin-visualizer';
import pkg from './package.json';
import { Plugin } from 'vite';

/** Get build directory from package.json */
const outDir = pkg.module.split('/')[0];

// https://vitejs.dev/config/
export default defineConfig({
	esbuild: {
		// These values
		jsxFactory: 'jsx',
		jsxImportSource: '@emotion/react',
		// This command ensures that the jsx method points to Emotion
		jsxInject: `import { jsx } from '@emotion/react';`,
	},
	plugins: [
		react({
			// The automatic runtime injects `react-is` and `react/jsx-runtime`,
			// which we do not want as part of our bundle.
			jsxRuntime: 'classic',
			babel: {
				// https://emotion.sh/docs/install#babelrc
				plugins: ['@emotion'],
			},
		}),
	],
	build: {
		outDir,
		minify: false,
		lib: {
			entry: './src/App.tsx',
			formats: ['cjs', 'es'],
			fileName(format) {
				// Ensure the file names matches the package.json’s ones
				const path = format === 'es' ? pkg.module : pkg.main;
				// Strip out the build directory from the filename
				return path.replace(`${outDir}/`, '');
			},
		},
		rollupOptions: {
			input: './src/App.tsx',
			external: [
				// Ignore all dependencies and PeerDependencies in build
				...Object.keys(pkg.peerDependencies || {}),
				'prop-types',
			],
			plugins: [
				// The Rollup and Vite `Plugin` types do not perfectly overlap,
				// but there is no bug in production, so asserting the type
				// is acceptable in this instance
				visualizer({ filename: 'build/stats.html' }) as Plugin,
			],
		},
	},
});
