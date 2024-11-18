const path = require('path');
const fs = require('fs');
const webpack = require('@cypress/webpack-preprocessor');

module.exports = (on: any, config: any) => {
  // Webpack configuration
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

  // Register Webpack preprocessor
  on('file:preprocessor', webpack(options));

  // Task for writing to a JSON file with TypeScript support
  on('task', {
    writeToFile: (filename: string, data: any) => {
      const filePath = path.join(__dirname, '..', '..', 'cypress', 'fixtures', filename);

      // Check if the file exists, then read it
      let existingData = {};
      if (fs.existsSync(filePath)) {
        existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      }

      // Merge the existing data with the new data (update only specific fields)
      const updatedData = { ...existingData, ...data };

      // Write the updated data back to the file
      fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
      return null; // Return null as the task completion status
    }
  });

  // Return the config object to be used in Cypress
  return config;
};
