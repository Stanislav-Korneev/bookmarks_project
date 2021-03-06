const path = require('path');

// Adding global styles into the project
function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/scss/variables.scss'),
        path.resolve(__dirname, './src/assets/scss/mixin.scss'),
        path.resolve(__dirname, './src/assets/scss/global.scss'),
      ],
    });
}

module.exports = {
  chainWebpack: (config) => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach((type) => addStyleResource(config.module.rule('scss').oneOf(type)));
  },
};
