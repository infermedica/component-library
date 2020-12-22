module.exports = {
  stories: [
    '../docs/**/*.stories.@(mdx)',
    '../src/**/*.stories.@(mdx)'
  ],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
      },
    },
    '@storybook/addon-viewport',
    '@storybook/preset-scss',
    '@storybook/addon-controls',
    '@storybook/addon-a11y',
  ],
}
