module.exports = {
  extends: [
    'stylelint-config-recommended-scss',
    'stylelint-config-recommended-vue/scss',
    'stylelint-config-standard',
    'stylelint-config-idiomatic-order',
  ],
  rules: {
    'selector-max-id': 0,
    'max-line-length': 120,
    'custom-property-pattern': '_?-.+',
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: [
          'css-var',
          'str-index',
        ],
      },
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'function',
          'if',
          'each',
          'for',
          'include',
          'mixin',
          'at-root',
          'return',
          'else',
          'extend',
        ],
      },
    ],
  },
};
