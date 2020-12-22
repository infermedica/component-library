module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'max-len': ['error', {
      code: 120, ignoreStrings: true, ignoreUrls: true, ignorePattern: 'url',
    }],
    'vue/max-attributes-per-line': ['error', {
      singleline: 1,
      multiline: {
        max: 1,
        allowFirstLine: false,
      },
    }],
  },
  overrides: [
    {
      files: ['*.mdx'],
      extends: ['plugin:mdx/recommended'],
      rules: {
        semi: 0,
      },
    },
  ],
  ignorePatterns: ['**/utilities/*', '**/.storybook/*'],
};
