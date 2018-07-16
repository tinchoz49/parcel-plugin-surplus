const Asset = require('parcel-bundler/src/assets/JSAsset')
const SourceMap = require('parcel-bundler/src/SourceMap')
const compiler = require('surplus/compiler')

class JSAsset extends Asset {
  async pretransform () {
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
