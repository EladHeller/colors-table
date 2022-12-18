module.exports = {
  collectCoverage: true,
  testEnvironment: 'jsdom',
  coverageReporters: ['json-summary', 'lcov'],
  moduleNameMapper: {
    '\\.css$': '<rootDir>/stringable',
  },
  testPathIgnorePatterns: [
    'node_modules',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(@github/jtml|@github/catalyst)/)',
  ],
};
