const compiler = require('surplus/compiler');

module.exports = Asset =>
  class extends Asset {
    async pretransform() {
      if (this.contents.indexOf('surplus') === -1) {
        return;
      }

      if (this.options.sourceMaps) {
        const { src, map } = compiler.compile(this.contents, {
          sourcemap: 'extract',
          sourcefile: this.relativeName
        });
        this.contents = src;
        this.sourceMap = map;
      } else {
        this.contents = compiler.compile(this.contents);
      }

      return super.pretransform();
    }
  };
