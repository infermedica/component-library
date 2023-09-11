import { StorybookConfig } from '@storybook/vue3-vite'
import path from 'path';
import { mergeConfig } from 'vite';
import svgLoader from 'vite-svg-loader';

const config: StorybookConfig = {
  async viteFinal(config) {
    return mergeConfig(config, {
      define: {
        'process.env': {}
      },
      resolve: {
        alias: {
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
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
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
