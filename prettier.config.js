/** @type {import('prettier').Config} */
const config = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'lf',
  overrides: [
    {
      files: ['*.json', '*.json5', '*.jsonc'],
      options: {
        printWidth: 200,
        singleQuote: false,
        parser: 'json',
      },
    },
    {
      files: ['*.md', ' *.mdx'],
      options: {
        printWidth: 80,
        proseWrap: 'preserve',
        singleQuote: false,
        parser: 'markdown',
      },
    },
    {
      files: ['*.yaml', '*.yml'],
      options: {
        printWidth: 80,
        parser: 'yaml',
      },
    },
    {
      files: ['*.{ts,mts,cts,tsx'],
      options: {
        parser: 'typescript',
      },
    },
  ],
};

export default config;
