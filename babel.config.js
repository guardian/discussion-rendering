module.exports = {
    plugins: ['const-enum', '@babel/transform-typescript', 'babel-plugin-emotion'],
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
        '@emotion/babel-preset-css-prop',
    ],
    env: {
        test: {
            plugins: ['@babel/plugin-transform-runtime', 'babel-plugin-emotion'],
        },
    },
};
