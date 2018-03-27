import { actions } from './app';

describe('node oauth server', () => {
  let serverParam;
  beforeEach(() => {
    const setPortResult = actions.setServerPort(3001);
    expect(setPortResult).toBe(true);

    // eslint-disable-next-line
    serverParam = require('./server.js');
  });
  afterEach(() => {
    serverParam.server.close();
  });

  it('sets up the server listening on the current port', () => {
    const serverIsListening = serverParam.appServerIsListening();
    expect(serverIsListening).toBe(true);
  });
});
