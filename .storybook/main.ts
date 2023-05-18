import { mergeConfig } from 'vite';
import type { StorybookViteConfig } from '@storybook/builder-vite';
import react from '@vitejs/plugin-react';

const config: StorybookViteConfig = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  async viteFinal(config) {
    config.plugins = config.plugins?.filter(
      (plugin) => 
        //@ts-expect-error -- https://github.com/storybookjs/builder-vite/issues/210
        !(Array.isArray(plugin) && plugin[0]?.name.includes("vite:react"))
    );

    return mergeConfig(config, {
      plugins: [react({
        jsxImportSource: "@emotion/react",
      })],
    })
  },
  framework: {
    name: "@storybook/react-vite",
    options: {}
  }
}

export default config;