module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  webpackFinal: async config => {
      config.module.rules.push({
        test: /\.(ts|tsx)$/,
        loader: require.resolve('babel-loader'),
        options: {
            presets: [
                '@babel/preset-typescript',
                [
                    '@babel/preset-env',
                    {
                        targets: {
                            esmodules: true,
                        },
                    },
                ],
                [
                  '@babel/preset-react',
                  {
                      'runtime': 'automatic',
                      'importSource': '@emotion/core'
                  }
                ],
                '@emotion/babel-preset-css-prop',
            ],
        },
    });

      return config;
  },
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ]
}