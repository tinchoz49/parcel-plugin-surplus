const Asset = require('parcel-bundler/src/assets/JSAsset');
const surplusMixin = require('./surplus-asset');

class JSAsset extends surplusMixin(Asset) {}

module.exports = JSAsset;
