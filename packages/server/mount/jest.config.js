module.exports = {
	preset: 'ts-jest',
	transform: {
		'^.+\\.(ts|tsx)?$': 'ts-jest',
		'^.+\\.(js|jsx)$': 'babel-jest',
	},
  setupFiles: ["<rootDir>/src/__tests__/setup.ts"],
  modulePathIgnorePatterns: ["<rootDir>/src/__tests__/setup.ts"]
}