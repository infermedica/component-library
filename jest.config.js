module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  testMatch: ['<rootDir>/src/**/*.spec.{j,t}s?(x)'],
  collectCoverage: false,
  transform: {
    '^.+\\.svg$': '<rootDir>/tests/unit/transform/vue-svg-loader.js',
  },
};

