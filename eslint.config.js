import jsLint from '@eslint/js';
import typescriptLint from 'typescript-eslint';
import jestPlugin from 'eslint-plugin-jest';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

/** @type {Linter.Config[]} */
export default typescriptLint.config(
  jsLint.configs.recommended,
  typescriptLint.configs.recommendedTypeChecked,
  eslintConfigPrettier,
  {
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
    },
  },
  {
    files: ['**/*.{js,cjs,mjs}'],
    extends: [typescriptLint.configs.disableTypeChecked],
  },
  {
    files: ['**/*.spec.ts', '**/*.test.ts'],
    plugins: {
      jest: jestPlugin,
    },
    settings: {
      jest: {
        version: 27,
      },
      globals: {
        jest: true,
        describe: true,
        test: true,
        expect: true,
        beforeEach: true,
        afterEach: true,
        beforeAll: true,
        afterAll: true,
      },
    },
  }
);
