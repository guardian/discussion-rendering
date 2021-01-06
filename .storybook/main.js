const path = require('path');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  webpackFinal: async (config, { configType }) => {
      config.module.rules.push({
          test: /\.[jt]sx?$/,
          use: [
              {
                  loader: 'babel-loader',
                  options: {
                      presets: ['@babel/preset-env', '@babel/preset-react'],
                      plugins: [
                          'const-enum',
                          [
                              'emotion',
                              {
                                  sourceMap: false,
                              },
                          ],
                          '@babel/plugin-proposal-optional-chaining',
                          '@babel/plugin-proposal-nullish-coalescing-operator',
                      ],
                  },
              },
          ],
          include: path.resolve(__dirname, '../'),
      });

      // Return the altered config
      return config;
  },
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ]
}