/// <reference types="vitest" />
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
    coverage: {
      provider: 'istanbul',
      reporter: [ 'json' ],
      reportsDirectory: './coverage/storybook',
    },
    deps: { inline: [ 'date-fns' ] },
  },
});
