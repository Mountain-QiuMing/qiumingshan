module.exports = {
  extends: ['../../.eslintrc.js'],
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    project: 'src/client/tsconfig.json',
    sourceType: 'module',
  },
};
