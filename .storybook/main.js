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
    config.resolve.fallback = {
      ...config.resolve.fallback,
      crypto: false,
      'crypto-browserify': require.resolve('crypto-browserify')
    }
    return config;
  },
  stories: [
    // '../docs/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'
  ],
  addons: [
    '@pxblue/storybook-rtl-addon/register',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        }
      }
    }
  ],
  core: {
    'builder': 'webpack5'
  }
}

