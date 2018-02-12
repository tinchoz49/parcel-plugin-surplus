const examplePath = `${__dirname}/example.js`;

describe('#initialization', () => {
  const surplusPlugin = require('../index');

  it('surplus plugin should be a function', () => {
    expect(typeof surplusPlugin).toBe('function');
  });

  it('should define SurplusAsset as the JS asset', () => {
    const Bundler = require('parcel-bundler');
    let bundler = new Bundler(examplePath);
    surplusPlugin(bundler);
    expect(
      bundler.parser.extensions['.js'].includes('surplus-asset')
    ).toBeTruthy();
  });
});

describe('#transform', () => {
  const Bundler = require('parcel-bundler');
  const surplusPlugin = require('../index');
  let bundler = new Bundler(examplePath, {
    watch: false
  });
  surplusPlugin(bundler);

  it('should transform the jsx in example.js', async () => {
    expect.assertions(1);
    const result = await bundler.bundle();
    expect(
      result.entryAsset.generated.js.includes('Surplus.createElement')
    ).toBeTruthy();
  });
});
