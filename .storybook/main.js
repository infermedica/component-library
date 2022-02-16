const path = require('path');
module.exports = {
  webpackFinal: async (config, {configType}) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@':path.resolve('src'),
    }
    config.module.rules = config.module.rules.map((rule)=>{
      if(rule.type !== 'asset/resource') {
        return rule
      }
      rule.test = /\.(ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/;
      return rule;
    })
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        'vue-loader',
        { loader: 'vue-svg-loader',
          options: {
            svgo: {
              plugins: [
                { removeDimensions: true },
                { removeUselessStrokeAndFill: true },
                { convertStyleToAttrs: true },
              ]
            }
          }
        },
      ],
    })
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
    '../docs/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'
  ],
  addons: [
    '@pxblue/storybook-rtl-addon/register',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    'storybook-addon-outline',
    '@storybook/addon-measure',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        }
      }
    },
    '@ljcl/storybook-addon-cssprops'
  ],
  core: {
    'builder': 'webpack5'
  }
}

