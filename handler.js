'use strict';

var _graphql = require('graphql');
var Schema = require('./lib/schema');

module.exports.hello = function(event, context, cb) {
  cb(null, { message: 'Hello World', event });
}

module.exports.graphql = function(event, context, cb) {

  var query = event.body.query;

  _graphql.graphql(Schema, query).then(function(result) {
    return cb(null, result);
  });
};
