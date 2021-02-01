module.exports = {
    plugins: [
        "const-enum",
        "@babel/transform-typescript",
        [
            "babel-plugin-emotion",
            {
                "cssPropOptimization": true
            }
        ]
    ],
    presets: [
        '@babel/preset-env',
        '@babel/preset-typescript',
        "@babel/preset-react",
        '@emotion/babel-preset-css-prop'
    ],
    env: {
        test: {	
            plugins: ['@babel/plugin-transform-runtime'],	
        },	
    },
};
