const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const inputPath = `${__dirname}/samples/input.js`;
const outputPath = `${__dirname}/samples/output.js`;

describe('#initialization', () => {
  const surplusPlugin = require('../index');
  const Bundler = require('parcel-bundler');
  let bundler = new Bundler(inputPath);
  surplusPlugin(bundler);
  const jsAsset = 'parcel-plugin-surplus/lib/js-asset';
  const tsAsset = 'parcel-plugin-surplus/lib/ts-asset';

  it('surplus plugin should be a function', () =>
    expect(typeof surplusPlugin).toBe('function'));

  it('should define SurplusAsset as the js asset', () =>
    expect(bundler.parser.extensions['.js'].includes(jsAsset)).toBeTruthy());
  it('should define SurplusAsset as the jsx asset', () =>
    expect(bundler.parser.extensions['.jsx'].includes(jsAsset)).toBeTruthy());
  it('should define SurplusAsset as the es6 asset', () =>
    expect(bundler.parser.extensions['.es6'].includes(jsAsset)).toBeTruthy());
  it('should define SurplusAsset as the jsm asset', () =>
    expect(bundler.parser.extensions['.jsm'].includes(jsAsset)).toBeTruthy());
  it('should define SurplusAsset as the mjs asset', () =>
    expect(bundler.parser.extensions['.mjs'].includes(jsAsset)).toBeTruthy());
  it('should define SurplusAsset as the tsx asset', () =>
    expect(bundler.parser.extensions['.tsx'].includes(tsAsset)).toBeTruthy());
});

describe('#transform', () => {
  const Bundler = require('parcel-bundler');
  const surplusPlugin = require('../index');
  let bundler = new Bundler(inputPath, {
    watch: false
  });
  surplusPlugin(bundler);

  it('should transform the jsx in input.js', async () => {
    expect.assertions(1);
    const result = await bundler.bundle();
    const output = await readFile(outputPath, 'utf8');
    expect(result.entryAsset.generated.js).toEqual(output);
  });
});
