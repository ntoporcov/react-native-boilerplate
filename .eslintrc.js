module.exports = {
  extends: ['universe', 'plugin:react/recommended'],
  rules: {
    'react/jsx-curly-brace-presence': [1, 'never'],
    'react/react-in-jsx-scope': 0,
    'react/no-unescaped-entities': 0,
    quotes: [2, 'single', { avoidEscape: true }],
    'import/order': 0,
  },
};
