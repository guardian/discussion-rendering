import source from '../rollup.config.js';
import { babel } from '@rollup/plugin-babel';
import serve from 'rollup-plugin-serve';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import html from '@rollup/plugin-html';
import replace from '@rollup/plugin-replace';
import livereload from 'rollup-plugin-livereload';

const extensions = ['.js', '.mjs', '.ts', '.tsx'];
const dir = './test-page/dist';
const watch = !!process.env.ROLLUP_WATCH;

const config = {
	input: './test-page/index.tsx',
	output: [
		{
			dir,
			format: 'esm',
		},
	],
	plugins: [
		babel({
			babelHelpers: 'bundled',
			extensions,
			presets: [
				[
					'@babel/preset-env',
					{
						targets: {
							esmodules: true,
						},
					},
				],
			],
		}),
		html({ title: 'Discussion-rendering' }),
		resolve({ extensions }),
		commonjs(),
		replace({
			preventAssignment: true,
			'process.env.NODE_ENV': JSON.stringify('development'),
		}),
		watch && serve(dir),
		watch && livereload({ watch: dir }),
	].filter(Boolean),
};

export default [source, config];
