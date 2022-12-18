/* eslint-disable @typescript-eslint/no-var-requires */
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (_, configuration) => ({
  entry: './src/index.ts',
  resolve: { extensions: ['.ts', '.js'] },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(t|j)s$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['css-loader'],
      },
    ],
  },
  optimization: configuration.mode === 'production' ? {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        keep_classnames: /.*Element/,
      },
    })],
  } : undefined,
  devServer: configuration.mode === 'development' ? {
    static: {
      directory: './dist',
    },
    compress: true,
    port: 8081,
  } : undefined,
});
