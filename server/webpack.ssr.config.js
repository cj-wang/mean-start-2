const webpack = require('webpack');
const path = require('path');
const WebpackConfigFactory = require('@nestjs/ng-universal')
  .WebpackConfigFactory;

/**
 * In fact, passing following configuration to the WebpackConfigFactory is not required
 * default options object returned from this method has equivalent entries defined by default.
 *
 * Example: WebpackConfigFactory.create(webpack);
 */
const config = WebpackConfigFactory.create(webpack, {
  // This is our Nest server for Dynamic universal
  server: './server/src/main.ssr.ts',
  // This is an example of Static prerendering (generative)
  // prerender: './server/src/prerender.ts',
}, __dirname);

config.output = {
  path: path.join(__dirname, '../dist'),
  filename: '[name].js',
};

module.exports = config;
