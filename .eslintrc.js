module.exports = {
  "extends": "airbnb",
  "parserOptions": {
  "ecmaFeatures": {
      "jsx": true
    }
  },
  "plugins": ["react"],
  "extends": ["plugin:react/recommended"],
  [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'next/core-web-vitals'
  ]
};