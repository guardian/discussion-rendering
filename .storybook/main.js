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
          test: /\.(ts|tsx)$/,
          exclude: nodeModulesExclude,
          use: [
              {
                  loader: 'ts-loader',
              },
          ],
      });

      config.module.rules.push({
        // @guardian packages must be transpiled
        // https://github.com/guardian/recommendations/blob/main/npm-packages.md#using-guardian-npm-packages
        test: /@guardian\/.+\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: { node: '14' },
                  },
                ],
              ],
            },
          },
        ],
      });


      // update storybook webpack config to transpile *all* JS
      config.module.rules.find(rule => String(rule.test) === String(/\.(mjs|tsx?|jsx?)$/))
      .exclude = nodeModulesExclude;

      return config;
  },
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ]
}