const appSite  = process.env.SITE || '';
let config     = require(`./config/${appSite}`);

module.exports = {
    appSite,
    config
};