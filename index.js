module.exports = function(bundler) {
  const jsAsset = require.resolve('./lib/js-asset.js');
  const tsAsset = require.resolve('./lib/ts-asset.js');

  bundler.addAssetType('js', jsAsset);
  bundler.addAssetType('jsx', jsAsset);
  bundler.addAssetType('es6', jsAsset);
  bundler.addAssetType('jsm', jsAsset);
  bundler.addAssetType('mjs', jsAsset);
  bundler.addAssetType('ts', tsAsset);
  bundler.addAssetType('tsx', tsAsset);
};
