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

  // Import plugin configuration
  {
    files: ['src/**/*.js', 'src/**/*.jsx'], // Apply to specific file types
    plugins: {
      import: eslintPluginImport, // Register the plugin
    },
    rules: {
      // Import rules from the plugin
      ...eslintPluginImport.configs.recommended.rules,
      'import/no-unresolved': 'error', // Example additional rule
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
    },
  },

  // Additional custom rules
  {
    files: ['src/**/*.js', 'src/**/*.jsx'],
    rules: {
      // Example: Allow console statements during development
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    },
  },
];
