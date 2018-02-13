const compiler = require('surplus/compiler');

module.exports = Asset =>
  class extends Asset {
    async pretransform() {
      const opts = {};
      if (this.options.sourceMaps) {
        opts.sourcemap = 'append';
      }
      this.contents = compiler.compile(this.contents, opts);
      return super.pretransform();
    }
  };
