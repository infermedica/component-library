import { StorybookConfig } from '@storybook/vue3-vite'
import path from 'path';
import { mergeConfig } from 'vite';
import svgLoader from 'vite-svg-loader';
import postcss from 'postcss';

const config: StorybookConfig = {
  async viteFinal(config) {
    // return the customized config
    return mergeConfig(config, {
      define: {
        'process.env': {}
      },
      // customize the Vite config here
      resolve: {
        alias: {
          '@infermedica/component-library': path.resolve(__dirname, 'index.ts'),
          '@': path.resolve(__dirname, '../src'),
          '@sb': path.resolve(__dirname)
        }
      },
      plugins: [
        svgLoader({
          svgoConfig: {
            plugins: [
              'removeDimensions',
              'removeUselessStrokeAndFill',
              'convertStyleToAttrs'
            ]
          }
        })
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
    '../docs/**/*.mdx',
    '../docs/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    // addons appears in a order that they are declared below
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: postcss
        }
      }
    },
    // @storybook/addon-jest is used to display vitest results
    '@storybook/addon-jest',
    // TODO: fix addons below after migration to sb 7.0.0
    // '@brightlayer-ui/storybook-rtl-addon/register',
    // 'storybook-addon-designs',
    './addons/cssProperties/preset.js',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  core: {
    disableTelemetry: true
  },
  docs: {
    autodocs: true
  }
};

export default config
