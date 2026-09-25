import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import base from '../eslint.config.base.js';

export default tseslint.config(
  ...base,
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // Use utils/logger for debug/info output; raw console.log is banned.
      'no-console': ['error', { allow: ['warn', 'error'] }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': ['error', { fixToUnknown: true }],
    },
  },
  {
    files: ['src/test/**', '**/*.test.{ts,tsx}', 'e2e/**'],
    rules: {
      'no-console': 'off',
    },
  },
  {
    ignores: ['dist', 'coverage'],
  }
);
