export default {
  preset: 'ts-jest/presets/js-with-ts-esm',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/client/src/tests'],
  setupFilesAfterEnv: ['<rootDir>/client/src/tests/setupTests.ts'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^@/(.*)$': '<rootDir>/client/src/$1',
    '^@shared/(.*)$': '<rootDir>/shared/$1',
  },
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.jest.json',
      useESM: true,
    },
  },
};
