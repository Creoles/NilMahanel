var path = require('path');
var cooking = require('cooking');

cooking.set({
    entry: {
        app: ['babel-polyfill', './src/app.js']
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
    chunk: true, // see https://cookingjs.github.io/zh-cn/configuration.html#chunk
    publicPath: '/',
    assetsPath: 'static',
    urlLoaderLimit: 10000,
    extractCSS: '[name].[contenthash:7].css',
    alias: {
        'src': path.join(__dirname, 'src'),
        'assets': path.join(__dirname, 'src/assets')
    },
    static: 'src/assets',
    extends: ['vue2', 'sass', 'buble', 'autoprefixer']
});

module.exports = cooking.resolve();