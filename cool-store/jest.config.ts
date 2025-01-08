import { Config } from '@jest/types';

const config: Config.InitialOptions = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: './src',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    // coverageDirectory: '../coverage',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@common/(.*)$': '<rootDir>/common/$1',
        '^@products/(.*)$': '<rootDir>/products/$1',
        '^@user/(.*)$': '<rootDir>/user/$1',
        '^@database/(.*)$': '<rootDir>/database/$1',
        '^@auth/(.*)$': '<rootDir>/auth/$1',
        '^@constants/(.*)$': '<rootDir>/constants/$1',
    },
};

export default config;
