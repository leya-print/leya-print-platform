const path = require('path');

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
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    output: {
      filename: 'index.esm.js',
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
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
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