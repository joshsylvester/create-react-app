/**
 * This is used to serve the react build to support salesforce development
 * Enter the consumerKey and consumerSecret from connected app salesforce
 * Please use callback url http://localhost:3000/oauth/callback while creating connected app
 */
const { app } = require('./app');

function appListen3000() {
  console.log('Listening on port 3001');
  return true;
}

const server = app.listen(3001, appListen3000);

module.exports = { server, appListen3000 };
