
import { app, actions, vars } from './app';
import request from 'supertest';
const oauth2 = require('salesforce-oauth2');

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
    expect(vars.callbackUrl).toMatch(/localhost:3000\/oauth\/callback/);
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

  it('should redirect the oauth method', async (done) => {
    vars.consumerKey = '1234567890';
    vars.consumerSecret = 'password';
    actions.appOauth.callbackFn = jest.fn();
    const obj = {
      instance_url: 'INSTANCE URL',
      access_token: 'ACCESS_TOKEN',
    };
    oauth2.authenticate = jest.fn(() => obj);
    await request(app).get('/oauth/callback').then((response) => {
      expect(response.statusCode).toBe(302);
      done();
    });
  });
});
