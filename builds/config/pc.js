'use strict';

module.exports = {
  env: {
    name    : 'webapp',
    title   : 'Web chat',
    viewport: 'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover',
    gtm_id  : '',
    desc    : '',
    livechat_id: '',
  },
  overrideUrlSuffix: '',
  publicPath: '/',
  assetsDir : '',
  entryFile: 'main.ts',
  resources : [],
  settings  : {},
  // PWA對API路由快取規則，function內容不可使用到外部變數
  pwaApiCachingUrlPatterns: ({ request, url }) =>
    request.destination === '' &&
    /.*\/api\/.*/.test(url) &&
    [
      /\/api\/public\/(init|locale|marquee|carousel|quest|game-types|games|config)/,
      /\/api\/platform\//,
    ].some((regex) => regex.test(url))
};
