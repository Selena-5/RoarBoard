import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import eslintPluginImport from 'eslint-plugin-import';

const compat = new FlatCompat();

export default [
  // Compatibility with older configs
  ...compat.extends('react-app'),
  ...compat.extends('react-app/jest'),

  // Base configuration for JavaScript
  js.configs.recommended,

  // Import plugin setup
  {
    plugins: ['import'],
    rules: {
      'import/no-unresolved': 'error', // Example rule
      // Other import plugin rules can be added as needed
    },
  },

  // Additional custom rules (if needed)
  {
    files: ['src/**/*.js', 'src/**/*.jsx'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
    },
    rules: {
      // Example: Allow console statements during development
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    },
  },
];
