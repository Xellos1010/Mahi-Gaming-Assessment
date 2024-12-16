const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/react-mahi-book-store-backend'),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ["./src/assets"],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
    }),

    // Use CopyWebpackPlugin to copy the startup.ts to the dist folder
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/startup.js', to: 'startup.js' }
      ],
    })
  ],
};
