import jsLint from '@eslint/js';
import typescriptLint from 'typescript-eslint';
import vitestPlugin from '@vitest/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

/** @type {Linter.Config[]} */
export default typescriptLint.config(
  jsLint.configs.recommended,
  typescriptLint.configs.recommendedTypeChecked,
  eslintConfigPrettier,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.cts, **/*.mts'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2020,
        ...globals.browser,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars-experimental': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
    },
  },
  {
    files: ['**/*.{js,cjs,mjs}'],
    ignores: ['.husky', 'node_modules', '.git', 'coverage'],
    extends: [typescriptLint.configs.disableTypeChecked],
  },
  {
    files: ['**/*.spec.ts', '**/*.test.ts'],
    ...vitestPlugin.configs.recommended,
    languageOptions: {
      globals: {
        ...vitestPlugin.environments.env.globals,
      },
    },
  },
  {
    ignores: ['dist', '.husky', 'node_modules', '.git', 'coverage', '*.env*'],
  }
);
