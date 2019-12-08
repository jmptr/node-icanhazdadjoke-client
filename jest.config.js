module.exports = {
  collectCoverage: true,
  coverageDirectory: './build/coverage',
  coverageReporters: [
    'json',
    'lcov',
    'text',
    'html'
  ],
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  },
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json'
  ],
  testPathIgnorePatterns: [
    'node_modules'
  ],
  testRegex: 'src/.*(/__tests__/.*|(.|/)(test|spec)).(ts|js)x?$',
  testURL: 'http://localhost/',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
