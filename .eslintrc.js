const path = require('path');

module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/airbnb',
    '@vue/typescript/recommended',
    'plugin:storybook/recommended',
    'plugin:vitest-globals/recommended',
  ],
  parserOptions: { ecmaVersion: 2020 },
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      { ignoreRestSiblings: true },
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': [ 'error' ],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/first': 'off',
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxEOF: 1,
      },
    ],
    'max-len': [ 'off' ],
    'vue/max-len': [
      'error',
      {
        code: 120,
        template: 120,
        tabWidth: 2,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
        ignoreHTMLAttributeValues: true,
        ignoreHTMLTextContents: true,
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.stories.@(js|jsx|ts|tsx|mdx)',
          '**/*.spec.{j,t}s?(x)',
        ],
      },
    ],
    'prefer-destructuring': [
      'error',
      { array: false },
    ],
    'vue/v-on-event-hyphenation': [
      'error',
      'always',
      { autofix: true },
    ],
    'object-property-newline': [
      'error',
      { allowAllPropertiesOnSameLine: false },
    ],
    'vue/object-property-newline': [
      'error',
      { allowAllPropertiesOnSameLine: false },
    ],
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          minProperties: 2,
          multiline: true,
        },
        ObjectPattern: {
          minProperties: 2,
          multiline: true,
        },
        ImportDeclaration: {
          multiline: true,
          minProperties: 2,
        },
        ExportDeclaration: {
          multiline: true,
          minProperties: 2,
        },
      },
    ],
    'import-newlines/enforce': [
      'error',
      {
        items: 1,
        semi: true,
      },
    ],
    'object-curly-spacing': [
      'error',
      'always',
    ],
    'vue/object-curly-spacing': [
      'error',
      'always',
    ],
    'vue/object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          minProperties: 2,
          multiline: true,
        },
        ObjectPattern: {
          minProperties: 2,
          multiline: true,
        },
        ImportDeclaration: {
          multiline: true,
          minProperties: 2,
        },
        ExportDeclaration: {
          multiline: true,
          minProperties: 2,
        },
      },
    ],
    'array-element-newline': [
      'error',
      {
        ArrayExpression: {
          multiline: true,
          minItems: 2,
        },
        ArrayPattern: {
          multiline: true,
          minItems: 2,
        },
      },
    ],
    'array-bracket-newline': [
      'error',
      { minItems: 2 },
    ],
    'array-bracket-spacing': [
      'error',
      'always',
    ],
    'vue/array-bracket-newline': [
      'error',
      { minItems: 2 },
    ],
    'vue/array-bracket-spacing': [
      'error',
      'always',
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  overrides: [
    {
      files: [ '**/*.spec.{j,t}s?(x)' ],
      env: { 'vitest-globals/env': true },
    },
    {
      files: [ '**/*.vue' ],
      rules: {
        'no-restricted-imports': [
          'error',
          { patterns: [ '@/*' ] },
        ],
      },
    },
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          [
            '@sb',
            path.resolve(__dirname, '.storybook'),
          ],
          [
            '@',
            path.resolve(__dirname, 'src'),
          ],
        ],
        extensions: [
          '.ts',
          '.js',
        ],
      },
      node: {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
        ],
      },
    },
  },
  plugins: [ 'import-newlines' ],
};
