import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';

const compat = new FlatCompat();

export default [
  // Base configuration for JavaScript
  js.configs.recommended,

  // Plugin configurations
  {
    files: ['src/**/*.js', 'src/**/*.jsx'],
    plugins: {
      import: eslintPluginImport,
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
    },
    rules: {
      ...eslintPluginImport.configs.recommended.rules,
      ...eslintPluginReact.configs.recommended.rules,
      ...eslintPluginReactHooks.configs.recommended.rules,
      'import/no-unresolved': 'error',
      'react/react-in-jsx-scope': 'off', // Disable React import requirement for JSX (newer React versions)
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
