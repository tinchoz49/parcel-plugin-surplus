module.exports = function (bundler) {
  const jsAsset = require.resolve('./lib/js-asset.js')

  bundler.addAssetType('js', jsAsset)
  bundler.addAssetType('jsx', jsAsset)
  bundler.addAssetType('es6', jsAsset)
  bundler.addAssetType('jsm', jsAsset)
  bundler.addAssetType('mjs', jsAsset)
}
