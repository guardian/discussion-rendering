const nodeModulesExclude = [
  {
      test: /node_modules/,
      exclude: [
          /@guardian\//,
      ],
  },
]

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  webpackFinal: async config => {
      config.module.rules.push({
          test: /\.[jt]sx?|mjs$/,
          exclude: nodeModulesExclude,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-react',
                  [
                    '@babel/preset-env',
                    {
                      bugfixes: true,
                      targets: {
                        esmodules: true,
                      },
                    },
                  ],
                ],
              },
            },
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            }
          ],
      });

      return config;
  },
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ]
}