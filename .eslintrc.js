module.exports = {
  parser: 'babel-eslint',

  extends: [
    // 'standard',
    // 'standard-react',
    '@gtp',
    'plugin:prettier/recommended',
  ],

  plugins: ['react'],

  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },

  env: {
    es6: true,
  },

  rules: {
    // don't force es6 functions to include space before paren
    'space-before-function-paren': 0,

    // allow specifying true explicitly for boolean props
    'react/jsx-boolean-value': 0,
  },

  settings: {
    react: {
      pragma: 'React',
      version: '16.0',
    },
  },
};