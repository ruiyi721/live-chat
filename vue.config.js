const { defineConfig } = require("@vue/cli-service");
const builds = require('./builds'); // 有appSite, config
const config = builds.config;
const ENV = process.env;

const proxyTarget = ENV.VUE_APP_API_URL || '/';
const proxyPrefix = ENV.PROXY_PREFIX || '/';

module.exports = defineConfig({
  productionSourceMap: false,
  pages: {
    index: `src/${builds.appSite}/${config.entryFile || 'main.ts'}`,
  },
  publicPath: ENV.NODE_ENV === 'production' ? config.publicPath : '/',
  assetsDir : config.assetsDir,
  devServer: {
    // 代理配置
    proxy: {
      // 如果请求地址以/api打头,就出触发代理机制
      [proxyPrefix]: {
        target: proxyTarget, // 要代理的真实接口地址
        // http://localhost:9588/api/login -> http://localhost:3000/api/login
        pathRewrite: {
          ['^' + proxyPrefix]: proxyPrefix
        },
        changeOrigin: true,
        xfwd: false,
        headers: {
          'Origin': proxyTarget,
          'Referer': proxyTarget,
        },
      }
    }
  }
});
