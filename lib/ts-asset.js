const Asset = require('parcel-bundler/src/assets/TypeScriptAsset')
const surplusMixin = require('./surplus-asset')

class TSAsset extends surplusMixin(Asset) {}

module.exports = TSAsset
