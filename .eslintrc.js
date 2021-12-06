module.exports = {
  root: true,
  extends: '@react-native-community',
  parserOptions: {
    ecmaFeatures: {
      `jsx: true`
    }
  },
  plugins: ['react', 'react-native', 'react-hooks', 'prettier'],
    rules: {
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    },
};
