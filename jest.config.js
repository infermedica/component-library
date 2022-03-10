module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  testMatch: ['<rootDir>/src/**/*.spec.{j,t}s?(x)'],
  collectCoverage: true,
  transform: {
    '^.+\\.svg$': '<rootDir>/tests/unit/transform/vueSvgLoader.js',
  },
};

