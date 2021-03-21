module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/__tests__'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/infra/databases/postgres/**'
  ],
  coverageDirectory: '__coverage__',
  transformIgnorePatterns: ['/node_modules/'],
  clearMocks: true,
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '@fixtures/(.*)': '<rootDir>/__fixtures__/$1',
    '@tests/(.*)': '<rootDir>/__tests__/$1'
  }
}
