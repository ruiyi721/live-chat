const { defineConfig } = require("@vue/cli-service");
const CopyPlugin = require('copy-webpack-plugin');
const builds = require('./builds');
const config = builds.config;

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  pages: {
    index: `src/${builds.appSite}/${ config.entryFile || 'main.ts' }`,
  },
});
