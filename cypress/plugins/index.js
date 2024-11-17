const path = require('path');
const webpack = require('@cypress/webpack-preprocessor');

module.exports = (on, config) => {
  const options = {
    webpackOptions: {
      resolve: {
        extensions: ['.ts', '.js', '.json'],
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'ts-loader',
                options: {
                  transpileOnly: true, // Speeds up the compilation process
                },
              },
            ],
          },
        ],
      },
    },
  };

  on('file:preprocessor', webpack(options));

  return config;
};
