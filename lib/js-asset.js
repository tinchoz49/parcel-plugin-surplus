const Asset = require('parcel-bundler/src/assets/JSAsset')
const SourceMap = require('parcel-bundler/src/SourceMap')
const compiler = require('surplus/compiler')
const merge = require('./mergeSourceMaps')

class JSAsset extends Asset {
  async pretransform() {
    if (this.options.sourceMaps) {
      const { src, map } = compiler.compile(this.contents, {
        sourcemap: 'extract',
        sourcefile: this.relativeName
      })

      if (this.contents !== src) {
        this.contents = src
        if (this.sourceMap) {
          this.sourceMap = await merge.mergeToPostProcessedSourceMap(map, this.sourceMap)
        }
        else {
          this.sourceMap = map
        }
      }
    }
    else {
      this.contents = compiler.compile(this.contents)
    }

    return super.pretransform()
  }
}

module.exports = JSAsset
