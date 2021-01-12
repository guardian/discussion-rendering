module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  webpackFinal: async config => {
      config.module.rules.push({
          test: /\.(ts|tsx)$/,
          use: [
              {
                  loader: require.resolve('ts-loader'),
              },
          ],
      });

      return config;
  },
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ]
}