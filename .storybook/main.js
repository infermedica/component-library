const path = require('path');
module.exports = {
  webpackFinal: async (config, {configType}) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@':path.resolve('src'),
    }
    return config;
  },
  stories: [
    // '../docs/**/*.stories.@(mdx)',
    '../src/**/*.stories.@(mdx)'
  ],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
      },
    },
    '@storybook/addon-viewport',
    '@storybook/preset-scss',
    '@storybook/addon-controls',
    '@storybook/addon-a11y',
  ],
}
