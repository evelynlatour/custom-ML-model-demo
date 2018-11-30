const webpack = require(`webpack`);
const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);


module.exports = {
  entry: [`@babel/polyfill`, `./src/index.js`],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
          options: {
            presets: [`@babel/preset-env`],
          },
        },
      },
      {
        test: /\.css/,
        use: [
          {
            loader: `style-loader`,
          },
          {
            loader: `css-loader`,
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: `[local]___[hash:base64:5]`,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [`*`, `.js`, `.jsx`],
  },
  output: {
    path: `${__dirname}/dist`,
    publicPath: `/`,
    filename: `bundle.js`,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: `./dist`,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': `*`,
      'Access-Control-Allow-Headers': `*`,
    },
  },
};
