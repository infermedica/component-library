import { StorybookConfig } from '@storybook/vue3-vite';
import path from 'path';
import { mergeConfig } from 'vite';
import svgLoader from 'vite-svg-loader';
import VueDevTools from 'vite-plugin-vue-devtools'

const config: StorybookConfig = {
  async viteFinal(config) {
    return mergeConfig(config, {
      define: {
        'process.env': {}
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
          '@docs': path.resolve(__dirname, '../docs'),
          '@sb': path.resolve(__dirname),
          '@index': path.resolve(__dirname, '../index.ts'),
          '@infermedica/component-library': path.resolve(__dirname, '../index.ts')
        }
      },
      plugins: [
        svgLoader({
        svgoConfig: {
          plugins: ['removeDimensions', 'removeUselessStrokeAndFill', 'convertStyleToAttrs']
        }
      }),
        VueDevTools(),
      ],
      optimizeDeps: {
        include: ['react-syntax-highlighter', 'react-syntax-highlighter/dist/esm/languages/prism/scss', '@storybook/theming']
      }
    });
  },
  staticDirs: ['../public'],
  stories: ['../docs/**/*.mdx', '../docs/**/*.stories.@(js|jsx|ts|tsx)', '../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-a11y', '@storybook/addon-mdx-gfm'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  core: {
    disableTelemetry: true
  },
  docs: {
    autodocs: true
  },
  refs: {
    '@storybook/design-system': {
      disable: true
    }
  }
};
export default config;
