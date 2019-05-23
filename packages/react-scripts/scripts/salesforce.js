// The following environment vars are required when running a salesforce build.
//   REACT_APP_SF_BUILD_FOLDER = ''
//   REACT_APP_SF_STATIC_RESOURCE = ''
// eslint-disable-next-line strict
const spawn = require('react-dev-utils/crossSpawn');
const fs = require('fs');
const fsExtra = require('fs-extra');
const archiver = require('archiver');
const paths = require('../config/paths');

process.env.NODE_ENV = 'production';
require('../config/env');

let newPublicUrl;
const env = Object.create(process.env);
const buildFolder = process.env.REACT_APP_SF_BUILD_FOLDER;
const staticResource = process.env.REACT_APP_SF_STATIC_RESOURCE;
if (buildFolder && staticResource) {
  newPublicUrl = `{!URLFOR($Resource.${staticResource}, '${buildFolder}')}/`;
  env.PUBLIC_URL = newPublicUrl;
}

// setup zip file
const zipFileName = buildFolder + '.zip';
const zipFilePath = paths.appPath + '/' + zipFileName;

// remove the previous build
fsExtra.remove(paths.appBuild);
fsExtra.remove(zipFilePath);
console.log('- previous build cleared');

// run the normal build with the custom env
console.log('- build started');
const result = spawn.sync('node', [`${__dirname}/build.js`], { env });
if (result.signal) {
  if (result.signal === 'SIGKILL') {
    console.log(
      'The build failed because the process exited too early. ' +
        'This probably means the system ran out of memory or someone called ' +
        '`kill -9` on the process.'
    );
  } else if (result.signal === 'SIGTERM') {
    console.log(
      'The build failed because the process exited too early. ' +
        'Someone might have called `kill` or `killall`, or the system could ' +
        'be shutting down.'
    );
  }
  process.exit(1);
} else {
  console.log('- build completed: /build');

  // create the zip file, pause before starting
  setTimeout(function() {
    console.warn('- zip started');
    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver('zip', {});

    archive.on('error', function(err) {
      if (err.code === 'ENOENT') {
        console.log('!! no file', err);
      } else {
        throw err;
      }
    });

    archive.on('finish', function(err) {
      console.log('- zip completed:', zipFileName);
    });

    archive.pipe(output);
    archive.directory('./build', buildFolder);
    archive.finalize();
  }, 1000);
}
