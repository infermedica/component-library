module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
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
      code: 80, ignoreStrings: true, ignoreUrls: true, ignorePattern: 'url',
    }],
  },
  ignorePatterns: ['**/utilities/*', '**/.storybook/*'],
};
