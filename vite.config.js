import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
      {
        find: '@sb',
        replacement: path.resolve(__dirname, '.storybook'),
      },
      {
        find: '@index',
        replacement: path.resolve(__dirname, './index.ts'),
      },
    ],
  },
  plugins: [
    vue(),
    svgLoader({
      svgoConfig: {
        plugins: [
          'removeDimensions',
          'removeUselessStrokeAndFill',
          'convertStyleToAttrs',
        ],
      },
    }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    include: [ './src/**/*.spec.{js,ts}' ],
    reporters: [
      'default',
      'json',
    ],
    deps: { inline: [ 'date-fns' ] },
  },
});
