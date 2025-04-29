// // jest.config.ts
// import type { Config } from 'jest';

// const config: Config = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   collectCoverage: true,
//   coverageDirectory: 'coverage',
//   collectCoverageFrom: [
//     'src/**/*.ts', 
//     '!src/**/*.test.ts', 
//     '!src/**/index.ts', 
//   ],
//   coverageReporters: ['json', 'lcov', 'text', 'clover'], // customize as needed
// };

// export default config;
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
};

export default config;
