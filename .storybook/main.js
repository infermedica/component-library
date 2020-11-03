module.exports = {
  stories: [
    '../docs/**/*.stories.@(mdx)',
    '../src/**/*.stories.@(mdx)'
  ],
  addons: [
    '@storybook/preset-scss',
    '@storybook/addon-controls',
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
      },
    },
  ],
}
