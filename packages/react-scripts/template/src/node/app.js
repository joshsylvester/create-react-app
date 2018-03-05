/**
 * This is used to serve the react build to support salesforce development
 * Enter the consumerKey and consumerSecret from connected app salesforce
 * Please use callback url http://localhost:5000/oauth/callback while creating connected app
 */
const express = require('express');
const oauth2 = require('salesforce-oauth2');
const globalRequest = require('request');

const serverPort = 5000;
const localReactServer = 'http://localhost:3000';

function getCallbackUrl(port) {
  return `http://localhost:${port}/oauth/callback`;
}

const vars = {
  callbackUrl: getCallbackUrl(serverPort),
  consumerKey: '<enter the consumer key from connected app>',
  consumerSecret: '<enter the consumer secret from connected app>',
  staticUrl: `${__dirname}/../../build`,
  serverPort,
};

function setServerPort(port) {
  vars.serverPort = port;
  vars.callbackUrl = getCallbackUrl(port);
  return true;
}

function appRoot(request, response) {
  const uri = oauth2.getAuthorizationUrl({
    redirect_uri: vars.callbackUrl,
    client_id: vars.consumerKey,
    scope: 'api',
  });
  return response.redirect(uri);
}

function appGet(req, res) {
  const instanceUrl = global.instanceUrl;
  const accessToken = global.accessToken;
  const uri = instanceUrl + req.param('url');
  const authorization = `Bearer ${accessToken}`;

  function handleResponse(err, response, body) {
    res.send(body);
  }

  return globalRequest(
    {
      url: uri,
      headers: {
        Authorization: authorization,
      },
    },
    handleResponse,
  );
}

function appOauth(req, resp) {
  const authorizationCode = req.param('code');
  const callbackFn = (error, payload) => {
    global.instanceUrl = payload.instance_url;
    global.accessToken = payload.access_token;

    console.log(payload);
    return resp.redirect(`${localReactServer}/index.html`);
  };
  oauth2.authenticate(
    {
      redirect_uri: vars.callbackUrl,
      client_id: vars.consumerKey,
      client_secret: vars.consumerSecret,
      code: authorizationCode,
    },
    callbackFn,
  );
}

function setOriginHeaders(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', localReactServer);

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
}

// setup the express server using the above functions.
const app = express();

// setup the export for the file
const actions = {
  appRoot,
  appGet,
  appOauth,
  getCallbackUrl,
  setServerPort,
  setOriginHeaders,
};

// configure the express server.
app.use(setOriginHeaders);
app.get('/', actions.appRoot);
app.use(express.static(vars.staticUrl));
app.get('/get', actions.appGet);
app.get('/oauth/callback', actions.appOauth);

// export everything as an object
module.exports = { app, actions, vars };
