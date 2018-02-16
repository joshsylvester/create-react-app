/**
 * This is used to serve the react build to support salesforce development
 * Please see ./server.js for more information
 */
request = require('request'),
module.exports = {

  get: function(req, res){
    var instanceUrl = global['instanceUrl'];
    var accessToken = global['accessToken'];
    var uri = instanceUrl + req.param('url');
    var authorization = 'Bearer ' + accessToken;
    request(
      {
        url: uri,
        headers: {
          'Authorization': authorization
        }
      },
      function(err, response, body) {
        res.send(body);
      },
    );
  },

  post: function(req, res){

  }

}
