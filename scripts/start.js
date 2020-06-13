
process.env.NODE_ENV = 'development';

const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();

const config = require('../config/webpack.config')(process.env);

const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}))

// Serve the files on port 3000.
app.listen(3333, () => console.log('Example app listhening on port 3333!\n'))
