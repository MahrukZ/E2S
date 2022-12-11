/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest/presets/js-with-ts',
    testEnvironment: 'jsdom',
    "testEnvironmentOptions": {
        "url": "http://localhost:8080/"
    },
    transformIgnorePatterns: [
        "node_modules/(?!react-tooltip/.*)",
    ],
    moduleNameMapper: {
        "\\.(css|less|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>tests/styleExports.js",
      },
    setupFiles: [
    '<rootDir>/tests/jest.stub.js',
    "jest-canvas-mock"
    ]
  };



