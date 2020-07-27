module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-typescript',
        '@babel/preset-react',
        '@emotion/babel-preset-css-prop',
    ],

    plugins: [
        '@babel/plugin-transform-typescript',
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-nullish-coalescing-operator',
    ],
};
