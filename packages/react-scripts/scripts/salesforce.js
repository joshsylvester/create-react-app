// The following environment vars are required when running a salesforce build.
//   REACT_APP_SF_BUILD_FOLDER = ''
//   REACT_APP_SF_STATIC_RESOURCE = ''
const spawn = require('react-dev-utils/crossSpawn');

process.env.NODE_ENV = 'production';
require('../config/env');

const buildFolder = process.env.REACT_APP_SF_BUILD_FOLDER || 'CreateReactApp';
const staticResource = process.env.REACT_APP_SF_STATIC_RESOURCE || 'create_react_app';
const newPublicUrl = `{!URLFOR($Resource.${staticResource}, '${buildFolder}')}/`;

const env = Object.create(process.env);
env.PUBLIC_URL = newPublicUrl;

const result = spawn.sync('node', [`${__dirname}/build.js`], { env });

if (result.signal) {
  if (result.signal === 'SIGKILL') {
    console.log(
      'The build failed because the process exited too early. ' +
        'This probably means the system ran out of memory or someone called ' +
        '`kill -9` on the process.',
    );
  } else if (result.signal === 'SIGTERM') {
    console.log(
      'The build failed because the process exited too early. ' +
        'Someone might have called `kill` or `killall`, or the system could ' +
        'be shutting down.',
    );
  }
  process.exit(1);
} else {
  console.log('completed saleforce build');
}
process.exit(result.status);
