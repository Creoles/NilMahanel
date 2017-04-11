var path = require('path');
var cooking = require('cooking');

cooking.set({
    entry: {
        app: ['babel-polyfill', './src/app.js'],
        vendor1: ["vue", "vue-router", "vuex", "vue-i18n", "vuedraggable"],
        vendor2: ['element-ui']
    },
    dist: './dist',
    template: './index.tpl',

    devServer: {
        port: 8080,
        publicPath: '/'
    },
    // production
    clean: true,
    hash: true,
    // sourceMap: true,
    minimize: true,
    chunk: {
        'vendor1': {
            names: ['vendor1', 'vendor2'],
            minChunks: 3
        }
    }, // see https://cookingjs.github.io/zh-cn/configuration.html#chunk
    publicPath: '/',
    assetsPath: 'static',
    urlLoaderLimit: 10000,
    extractCSS: '[name].[contenthash:7].css',
    alias: {
        'src': path.join(__dirname, 'src'),
        'assets': path.join(__dirname, 'src/assets')
    },
    // static: 'assets',
    extends: ['vue2', 'sass', 'buble', 'autoprefixer']
});

module.exports = cooking.resolve();