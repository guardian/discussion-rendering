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
                  loader: require.resolve('ts-loader'),
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