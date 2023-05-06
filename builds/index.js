const { existsSync } = require('fs');
const merge = require('lodash.merge');

const ENV = process.env;
const appSite = ENV.SITE || ''; // package.json的script
let config = require(`./config/base`);
let siteConfig = {};

if (appSite) {
	const configFile = appSite + '.js'; // 決定builds config是mb或pc
	if (existsSync(`${__dirname}/config/${configFile}`)) {
		siteConfig = require('./config/' + configFile);
		config = merge(config, siteConfig); // 合併
	} else {
		console.warn(`[WARN] site config file (${configFile}) not found!`);
	}
}

// 把config裏env物件的key換成大寫
for (const key in config.env) {
	ENV[`VUE_APP_${key.toLocaleUpperCase()}`] = config.env[key] || '';
}

module.exports = {
	appSite,
	config
};