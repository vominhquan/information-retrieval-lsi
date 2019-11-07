const withPlugins = require('next-compose-plugins');
const css = require('@zeit/next-css');
const sourceMaps = require('@zeit/next-source-maps')

module.exports = withPlugins([
  css,
  sourceMaps,
], {})