import pkg from './package.json';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import clear from 'rollup-plugin-clear';
import visualizer from 'rollup-plugin-visualizer';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import replace from '@rollup/plugin-replace';

const extensions = ['.ts', '.tsx', ...DEFAULT_EXTENSIONS];

module.exports = {
    input: './src/App.tsx',
    output: [
        {
            file: 'build/App.js',
            format: 'cjs',
        },
        {
            file: 'build/App.esm.js',
            format: 'esm',
        },
    ],
     external: [
        // Ignore all dependencies and PeerDependencies in build
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
        'prop-types',
        // Nested src-foundations
        '@guardian/src-foundations/mq',
        '@guardian/src-foundations/palette',
        '@guardian/src-foundations/typography',
    ],
    plugins: [
        clear({
            targets: ['build/'],
        }),
        replace({ 'process.env.NODE_ENV': '"production"' }),
        resolve({ extensions }),
        commonjs(),
        babel({ extensions }),
        visualizer({ filename: 'build/stats.html' }),
    ],
};
