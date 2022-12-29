/* eslint-disable @typescript-eslint/no-var-requires */
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (_, configuration) => ({
  entry: './src/index.ts',
  resolve: { extensions: ['.ts', '.js', '.tsx'] },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
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
