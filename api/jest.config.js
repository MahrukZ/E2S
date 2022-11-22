/** @type {import('ts-jest').JestConfigWithTsJest} */
// this ensures that jest tests can import non ts files such as css files
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};