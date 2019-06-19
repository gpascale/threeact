module.exports = {
  overrides: [
    {
      files: '*.js',
      rules: {
        'no-unused-vars': [
          'warn',
          {
            vars: 'all',
            argsIgnorePattern: '(renderer|scene|camera|_.*)',
            varsIgnorePattern: '(React|_.*)',
          },
        ],
      },
    },
  ],
};
