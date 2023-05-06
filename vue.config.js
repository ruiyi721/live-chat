const { defineConfig } = require("@vue/cli-service");
const ENV    = process.env;
const builds = require('./builds'); // 有appSite, config
const config = builds.config;

module.exports = defineConfig({
  productionSourceMap: false,
  pages: {
    index: `src/${builds.appSite}/${ config.entryFile || 'main.ts' }`,
  },
  publicPath: ENV.NODE_ENV === 'production' ? config.publicPath : '/',
});
