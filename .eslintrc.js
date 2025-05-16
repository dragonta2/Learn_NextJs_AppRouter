// .eslintrc.js｜ESLint 設定ファイル

module.exports = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'next/core-web-vitals',
    'prettier', // ← 競合しないように最後に入れるのが一般的
  ],
  rules: {
    // ここに独自ルールを追加できる
    'no-undef': 'off', // 👈 React未定義エラーを無効化
    'no-unused-vars': 'warn', // ❗警告にダウングレード
  },
};
