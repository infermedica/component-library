const path = require('path');
const { mergeConfig } = require('vite');
const svgLoader = require('vite-svg-loader');

module.exports = {
  async viteFinal(config, { configType }) {
    // return the customized config
    return mergeConfig(config, {
      // customize the Vite config here
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
          '@sb': path.resolve(__dirname),
        },
      },
      plugins: [
        svgLoader({
          svgoConfig: {
            plugins: ['removeDimensions', 'removeUselessStrokeAndFill', 'convertStyleToAttrs'],
          },
        }),
      ],
      optimizeDeps: {
        include: [
          'react-syntax-highlighter',
          'react-syntax-highlighter/dist/esm/languages/prism/scss',
          '@storybook/theming'
        ]
      }
    });
  },
  staticDirs: ['../public'],
  stories: [
    '../docs/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@brightlayer-ui/storybook-rtl-addon/register',
    '@storybook/addon-interactions',
    '@ljcl/storybook-addon-cssprops',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        }
      }
    },
    'storybook-addon-designs',
    // TODO write global decorator for vitest results
    // 'storybook_vitest_addon'
  ],
  framework: '@storybook/vue3',
  core: {
    builder: '@storybook/builder-vite',
    disableTelemetry: true,
  },
  features: {
    storyStoreV7: true,
  },
}