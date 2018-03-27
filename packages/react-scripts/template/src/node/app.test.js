
import { app, actions, vars } from './app';
import request from 'supertest';

describe('node oauth server', () => {
  it('should redirect the root method by default', (done) => {
    request(app).get('/').then((response) => {
      expect(response.statusCode).toBe(302);
      done();
    });
  });

  it('should have the default url setup the root method by default', (done) => {
    request(app).get('/').then((response) => {
      expect(response.header.location).toMatch(/login.salesforce.com/);
      done();
    });
  });

  it('should have the static url set properly', () => {
    expect(vars.staticUrl).toMatch(/node\/..\/..\/build/);
  });

  it('should have the callback url set properly', () => {
    expect(vars.callbackUrl).toMatch(/localhost:5000\/oauth\/callback/);
  });

  it('should allow consumerKey and consumerSecret to be set properly', () => {
    vars.consumerKey = '1234567890';
    vars.consumerSecret = 'password';
    expect(vars.consumerKey).toMatch(/1234567890/);
  });

  it('should call through to the default get method', (done) => {
    request(app).get('/get').then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  it('should be able to get a callbackurl', () => {
    const getUrl = actions.getCallbackUrl(3001);
    expect(getUrl).toMatch('/localhost:3001/');
  });

  it('should be able to set the server port', () => {
    const setPortResult = actions.setServerPort(3001);
    expect(setPortResult).toBe(true);
    expect(vars.serverPort).toEqual(3001);
    expect(vars.callbackUrl).toMatch('/localhost:3001/');
  });

  // const oauth2 = require('salesforce-oauth2');
  // it('should redirect the oauth method', async (done) => {
  //   vars.consumerKey = '1234567890';
  //   vars.consumerSecret = 'password';
  //   const obj = {
  //     instance_url: 'INSTANCE URL',
  //     access_token: 'ACCESS_TOKEN',
  //   };
  //   actions.appOauth.callbackFn = jest.fn(() => obj);
  //   oauth2.authenticate = jest.fn(() => obj);
  //   await request(app).get('/oauth/callback').then((response) => {
  //     expect(actions.appOauth.callbackFn).toHaveBeenCalled();
  //     done();
  //   });
  // });
});
