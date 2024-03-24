import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  coverageDirectory: './coverage/',
  coverageReporters: ['json', 'lcov'],
};

export default config;
