/** @type {import('eslint/lib/shared/types').ConfigData} */

module.exports = {
  env: {
    node: true,
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'unused-imports'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'next/core-web-vitals'],
  root: true,
  ignorePatterns: ['.eslintrc*', '*.config.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'prettier/prettier': ['error', { printWidth: 120 }],
    '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
    'no-restricted-imports': ['error', { patterns: ['../'] }],
    'unused-imports/no-unused-imports': 'error',
  },
};
