import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import clear from 'rollup-plugin-clear';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import replace from '@rollup/plugin-replace';

const extensions = ['.ts', '.tsx', ...DEFAULT_EXTENSIONS];

module.exports = {
    input: './src/Index.tsx',
    output: [
        {
            file: 'build/Index.js',
            format: 'iife',
        },
    ],
    plugins: [
        clear({
            targets: ['build/'],
        }),
        replace({ 'process.env.NODE_ENV': '"development"' }),
        resolve({ extensions }),
        commonjs(),
        babel({ babelHelpers: 'bundled', extensions }),
    ],
};