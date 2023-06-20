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
      // 如果請求地址以/api打頭,就觸發代理機制
      [proxyPrefix]: {
        target: proxyTarget, // 要代理的真實接口地址
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
  },
  // 配置全局樣式變量
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "./src/base/styles/_variable.scss";`
      }
    }
  },
});
