/* eslint-env jest */
const inputPath = `${__dirname}/samples/input.js`

describe('#initialization', () => {
  const surplusPlugin = require('../index')
  const Bundler = require('parcel-bundler')
  let bundler = new Bundler(inputPath)
  surplusPlugin(bundler)
  const jsAsset = 'parcel-plugin-surplus/lib/js-asset'

  it('surplus plugin should be a function', () =>
    expect(typeof surplusPlugin).toBe('function'))

  it('should define SurplusAsset as the js asset', () =>
    expect(bundler.parser.extensions['.js'].includes(jsAsset)).toBeTruthy())
  it('should define SurplusAsset as the jsx asset', () =>
    expect(bundler.parser.extensions['.jsx'].includes(jsAsset)).toBeTruthy())
  it('should define SurplusAsset as the es6 asset', () =>
    expect(bundler.parser.extensions['.es6'].includes(jsAsset)).toBeTruthy())
  it('should define SurplusAsset as the jsm asset', () =>
    expect(bundler.parser.extensions['.jsm'].includes(jsAsset)).toBeTruthy())
  it('should define SurplusAsset as the mjs asset', () =>
    expect(bundler.parser.extensions['.mjs'].includes(jsAsset)).toBeTruthy())
})

describe('#transform', () => {
  const Bundler = require('parcel-bundler')
  const surplusPlugin = require('../index')

  it('should transform the jsx in input.js', async () => {
    expect.assertions(1)

    let bundler = new Bundler(inputPath, {
      watch: false
    })

    surplusPlugin(bundler)

    const result = await bundler.bundle()

    expect(result.entryAsset.generated.js.trim()).toMatchSnapshot()
  })

  it('should not try to parse with the surplus compiler', async () => {
    expect.assertions(1)

    let bundler = new Bundler(`${__dirname}/samples/no-surplus-view.js`, {
      watch: false
    })

    surplusPlugin(bundler)

    try {
      await bundler.bundle()
    } catch (e) {
      expect(e).toThrowErrorMatchingSnapshot()
    }
  })
})
