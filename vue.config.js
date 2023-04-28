const { defineConfig } = require("@vue/cli-service");
const builds = require('./builds');
const config = builds.config;

module.exports = defineConfig({
  productionSourceMap: false,
  pages: {
    index: `src/${builds.appSite}/${ config.entryFile || 'main.ts' }`,
  },
});
