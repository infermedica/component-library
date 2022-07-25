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
  parserOptions: {
    ecmaVersion: 2020,
  },
  // scrip setup related
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
  },
  rules: {
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/first': 'off',
    // scrip setup related
    'no-multiple-empty-lines': ['error', {
      max: 1,
      maxEOF: 1,
    }],
    'max-len': ['off'],
    'vue/max-len': ['error', {
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
    }],
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: ['**/*.stories.@(js|jsx|ts|tsx|mdx)', '**/*.spec.{j,t}s?(x)'],
    }],
    'prefer-destructuring': ['error', {
      array: false,
    }],
  },
  overrides: [{
    files: ['**/*.spec.{j,t}s?(x)'],
    env: {
      'vitest-globals/env': true,
    },
  },
  {
    files: ['**/*.vue'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: ['@/*'],
      }],
    },
  }],
  settings: {
    'import/resolver': {
      alias: [
        ['@sb', './.storybook'],
        ['@', './src'],
      ],
    },
  },
};
