const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
  {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(s?)css$/,
          use: [
            // to inject the result into the DOM as a style block
            { loader: "to-string-loader" },
            {
              loader: "css-loader",
            },
            {
              // to convert SASS to CSS
              loader: "sass-loader",
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js", ".scss", ".css"],
    },
    output: {
      filename: 'esm/index.esm.js',
      libraryTarget: 'module',
      path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
      static: './dist',
      port: 3334,
      open: true,
      allowedHosts: 'all',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    experiments: {
      outputModule: true, // Enable experimental feature to output modules
    },
    plugins: [new HtmlWebpackPlugin({
      template: 'index.html'
    })],
  },
  {
    entry: './src/index.ts',
    devtool: 'source-map',
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [{
            loader: 'babel-loader', // Use babel-loader for transpilation
            options: {
              presets: [
                '@babel/preset-env', // Use @babel/preset-env for transpiling modern JavaScript
                '@babel/preset-typescript', // Use @babel/preset-typescript for transpiling TypeScript
              ],
            },
          }],
          exclude: /node_modules/,
        },
        {
          test: /\.(s?)css$/,
          use: [
            // to inject the result into the DOM as a style block
            { loader: "to-string-loader" },
            {
              loader: "css-loader",
            },
            {
              // to convert SASS to CSS
              loader: "sass-loader",
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js", ".scss", ".css"],
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin(),
    ],
    output: {
      filename: 'index.cjs.js',
      libraryTarget: 'commonjs2',
      path: path.resolve(__dirname, 'dist'),
    },
  },
  {
    entry: './src/lit-templates.ts',
    devtool: 'inline-source-map',
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(s?)css$/,
          use: [
            // to inject the result into the DOM as a style block
            { loader: "to-string-loader" },
            {
              loader: "css-loader",
            },
            {
              // to convert SASS to CSS
              loader: "sass-loader",
            },
          ],
        }
      ],
    },
    resolve: {
      extensions: [".ts", ".js", ".scss", ".css"],
    },
    output: {
      filename: 'lit-templates.esm.js',
      libraryTarget: 'module',
      path: path.resolve(__dirname, 'dist'),
    },
    experiments: {
      outputModule: true,
    }
  }
];