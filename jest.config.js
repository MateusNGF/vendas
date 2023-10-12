const { resolve } = require('path');
const root = resolve(__dirname);

module.exports = {
  rootDir: root,
  displayName: 'root-tests',
  testMatch: ['<rootDir>/src/**/*.spec.ts', '<rootDir>/e2e/**/*.spec.ts'],
  testEnvironment: 'node',
  clearMocks: true,
  preset: 'ts-jest'
};