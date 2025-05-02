import type { Config } from 'jest';
import dotenv from 'dotenv';
dotenv.config();

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/jest.setup.ts'], // Add a setup file for environment variables
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Adjust path aliases if used
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',
      
    },
  },
  testTimeout: 30000, // Increase timeout for async operations
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
};

export default config;
