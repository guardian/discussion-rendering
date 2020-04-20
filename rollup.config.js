import pkg from './package.json';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import clear from 'rollup-plugin-clear';
import visualizer from 'rollup-plugin-visualizer';

const extensions = ['.ts', '.tsx'];

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
        babel({ extensions }),
        resolve({ extensions }),
        commonjs(),
        visualizer({ filename: 'build/stats.html' }),
    ],
};
