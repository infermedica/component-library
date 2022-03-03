const path = require('path');

module.exports = {
  webpackFinal: async (config) => {
    // Setup aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve('src'),
    };


    // Setup vue-svg-loader
    config.module.rules = config.module.rules.map((rule) => {
      if (rule.type !== 'asset/resource') {
        return rule;
      }
      rule.test = /\.(ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/;
      return rule;
    });
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        'vue-loader',
        {
          loader: 'vue-svg-loader',
          options: {
            svgo: {
              plugins: [
                { removeDimensions: true },
                { removeUselessStrokeAndFill: true },
                { convertStyleToAttrs: true }
              ],
            }
          }
        }
      ]
    });


    // Setup sass-loader
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ],
      include: path.resolve(__dirname, '../'),
    })


    return config;
  },
  'stories': [
    '../docs/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'
  ],
  'addons': [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@brightlayer-ui/storybook-rtl-addon/register',
    '@storybook/addon-jest',
    '@ljcl/storybook-addon-cssprops',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        }
      }
    }
  ],
  'framework': '@storybook/vue3',
  'core': {
    'builder': 'webpack5'
  }
}
