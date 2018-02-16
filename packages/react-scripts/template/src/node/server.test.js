
describe('node oauth server', () => {
  let serverParam;
  beforeEach(() => {
    // eslint-disable-next-line
    serverParam = require('./server.js');
  });
  afterEach(() => {
    serverParam.server.close();
  });

  it('listens on port 3000', () => {
    const result = serverParam.appListen3000();
    expect(result).toBe(true);
  });
});
