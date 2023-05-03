module.exports = {
  extends: [
    'eslint:recommended', 
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb-typescript'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    "project": "../tsconfig.json"
  },
  rules: {
    "semi": "off",
    "@typescript-eslint/semi": "off",
  },
  root: true,
};