import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
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
