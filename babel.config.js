module.exports = {
    plugins: ['const-enum', '@babel/transform-typescript'],
    presets: [
        '@babel/preset-env',
        '@babel/preset-typescript',
        [
            '@babel/preset-react',
            {
                'runtime': 'automatic',
                'importSource': '@emotion/core'
            }
        ],
    ],
    env: {
        test: {
            plugins: ['@babel/plugin-transform-runtime'],
        },
    },
};
