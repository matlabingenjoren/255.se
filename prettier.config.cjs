/** @type {import('prettier').Config} */
const config = {
  singleQuote: true,
  proseWrap: 'always',
  printWidth: 120,
  semi: false,
  overrides: [
    {
      files: '**/*.svx',
      options: {
        parser: 'markdown',
      },
    },
  ],
}

module.exports = config
