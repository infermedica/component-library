module.exports = {
  moduleFileExtensions: ['js', 'json', 'vue'],
  modulePaths: [
    '<rootDir>/src',
    '<rootDir>/node_modules',
  ],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/scripts'],
};
