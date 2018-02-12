module.exports = function(bundler) {
  bundler.addAssetType('js', require.resolve('./lib/surplus-asset.js'));
};
