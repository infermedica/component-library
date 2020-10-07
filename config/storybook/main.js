const path = require('path');

module.exports = {
  stories: [
    '../../docs/**/*.stories.(js|jsx|ts|tsx|mdx)',
    '../../src/**/*.stories.(js|jsx|ts|tsx|mdx)',
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.s?css$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });
    config.module.rules.push({
      resourceQuery: /blockType=i18n/,
      type: 'javascript/auto',
      loader: '@intlify/vue-i18n-loader',
    });
    return config;
  },
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        babelOptions: {
          presets: [
            [
              '@vue/cli-plugin-babel/preset',
              {
                jsx: false,
              },
            ],
          ],
        },
      },
    },
    '@storybook/addon-controls',
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-actions',
  ],
};
