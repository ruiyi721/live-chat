const ENV      = process.env;
const appSite  = process.env.SITE || ''; // package.json script
let config     = require(`./config/${appSite}`); // 決定builds config是mb或pc

for (const key in config.env) {
    ENV[`VUE_APP_${ key.toLocaleUpperCase() }`] = config.env[key] || '';
}

module.exports = {
    appSite,
    config
};