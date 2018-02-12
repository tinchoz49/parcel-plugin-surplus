const JSAsset = require('parcel-bundler/src/assets/JSAsset');
const compiler = require('surplus/compiler');

class SurplusAsset extends JSAsset {
  async pretransform() {
    const opts = {};
    if (this.options.sourceMaps) {
      opts.sourcemap = 'append';
    }
    this.contents = compiler.compile(this.contents, opts);
    return super.pretransform();
  }
}

module.exports = SurplusAsset;
