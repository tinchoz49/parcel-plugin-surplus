const Asset = require('parcel-bundler/src/assets/JSAsset')
const SourceMap = require('parcel-bundler/src/SourceMap')
const compiler = require('surplus/compiler')
const DepsRegex = require('deps-regex')

const re = new DepsRegex({
  matchInternal: true,
  matchES6: true
})

const isUsingSurplus = contents => re.getDependencies(contents).find(d => d === 'surplus')

class JSAsset extends Asset {
  async pretransform () {
    if (!isUsingSurplus(this.contents)) {
      return super.pretransform()
    }

    if (this.options.sourceMaps) {
      const { src, map } = compiler.compile(this.contents, {
        sourcemap: 'extract',
        sourcefile: this.relativeName
      })

      this.contents = src

      if (this.sourceMap) {
        this.sourceMap = await new SourceMap().extendSourceMap(
          this.sourceMap,
          map
        )
      } else {
        this.sourceMap = map
      }
    } else {
      this.contents = compiler.compile(this.contents)
    }

    return super.pretransform()
  }
}

module.exports = JSAsset
