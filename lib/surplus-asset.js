const JSAsset = require('parcel-bundler/src/assets/JSAsset');
const compiler = require('surplus/compiler');

class SurplusAsset extends JSAsset {
  async parse(code) {
    const opts = {};
    if (this.options.sourceMaps) {
      opts.sourcemap = 'append';
    }
    const surplusCode = compiler.compile(code, opts);
    return super.parse(surplusCode);
  }
}

module.exports = SurplusAsset;
