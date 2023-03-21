const nextJest = require('next/jest');

// TODO... potentially switch API tests to Jest since they apparently run faster - https://seanconnolly.dev/unit-testing-nextjs-api-routes

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
  verbose: true,
	globals: {
		TextEncoder: require('util').TextEncoder,
		TextDecoder: require('util').TextDecoder
	}
};

const createJestConfig = nextJest({
  dir: './'
});
const jestConfig = async () => {
  const nextJestConfig = await createJestConfig(customJestConfig)();
  return {
    ...nextJestConfig,
    moduleNameMapper: {
      // Workaround to put our SVG mock first
      '\\.svg$': '<rootDir>/__mocks__/svg.js',
			'^@/(.*)$': '<rootDir>/src/$1',
			'^@/public/(.*)$': '<rootDir>/public/$1',
      ...nextJestConfig.moduleNameMapper,
    },
		clearMocks: true,
		collectCoverage: true,
		collectCoverageFrom: [
			'./src/**/*.{js,jsx,ts,tsx}',
			'!./src/pages/api/**/*.{js,jsx,ts,tsx}',
			'!./src/**/_*.{js,jsx,ts,tsx}',
			'!**/*.d.ts',
			'!**/node_modules/**',
		],
		coverageThreshold: {
			global: {
				branches: 0,
				functions: 30,
				lines: 30,
				statements: 30,
			},
		},
		testEnvironment: 'jest-environment-jsdom',
  };
};

module.exports = jestConfig;
