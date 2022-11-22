/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    "testEnvironmentOptions": {
        "url": "http://localhost:8080/"
    },
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>tests/styleExports.js',
      }
  };


  