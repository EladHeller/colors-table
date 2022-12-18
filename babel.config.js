module.exports = {
  presets: [
    ['@babel/preset-env', {
      modules: false,
      targets: {
        chrome: '70',
      },
    }],
    ['@babel/preset-typescript'],
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
  ],
  env: {
    test: {
      plugins: ['@babel/plugin-transform-modules-commonjs'],
      presets: ['@babel/preset-typescript'],
    },
  },
};
