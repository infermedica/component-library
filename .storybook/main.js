const path = require('path');
module.exports = {
  webpackFinal: async (config, {configType}) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@':path.resolve('src'),
    }
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    })
    return config;
  },
  stories: [
    '../src/**/*.stories.@(mdx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    'arcade-storybook-addon-rtl',
  ],
}
