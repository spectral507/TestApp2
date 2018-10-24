const path = require('path');

module.exports = {
    lintOnSave: false,
    configureWebpack: config => {
        config.output.path = path.join(__dirname, 'wwwroot/dist');
        config.resolve.alias['@'] = 'C:\\Projects\\Vuejs\\TestApp2\\ClientApp';
        config.entry.app = './ClientApp/main.js';
        let jsxRule = config.module.rules.find(rule => rule.test.test('*.jsx'));
        if (jsxRule) {
            jsxRule.include[0] = 'C:\\Projects\\Vuejs\\TestApp2\\ClientApp';
        }
    },
    chainWebpack: cfg => {
        cfg.plugins.delete('html');
    }
};