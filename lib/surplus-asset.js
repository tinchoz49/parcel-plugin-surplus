const compiler = require('surplus/compiler');
const DepsRegex = require('deps-regex');
const re = new DepsRegex({
  matchInternal: true,
  matchES6: true,
  matchCoffeescript: true
});

const isUsingSurplus = contents =>
  re.getDependencies(contents).find(d => d === 'surplus');

module.exports = Asset =>
  class extends Asset {
    async pretransform() {
      if (!isUsingSurplus(this.contents)) {
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
