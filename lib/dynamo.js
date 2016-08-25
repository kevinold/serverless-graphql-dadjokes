'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.getAllJokes = getAllJokes;
exports.getJokeAuthor = getJokeAuthor;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dynamoConfig = {
  sessionToken: process.env.AWS_SESSION_TOKEN,
  region: process.env.AWS_REGION
};
var docClient = new _awsSdk2.default.DynamoDB.DocumentClient(dynamoConfig);
var stage = 'dev';
var projectName = 'serverless-graphql-dadjokes';
var jokesTable = projectName + '-jokes-' + stage;
var jokeAuthorsTable = projectName + '-jokeauthors-' + stage;

function getAllJokes() {
  return new _bluebird2.default(function (resolve, reject) {
    var params = {
      TableName: jokesTable,
      AttributesToGet: ['id', 'body', 'author']
    };

    docClient.scan(params, function (err, data) {
      if (err) return reject(err);
      return resolve(data["Items"]);
    });
  });
}

function getJokeAuthor(id) {
  return new _bluebird2.default(function (resolve, reject) {
    var params = {
      TableName: jokeAuthorsTable,
      Key: {
        id: id
      },
      AttributesToGet: ['id', 'name']
    };

    docClient.get(params, function (err, data) {
      if (err) return reject(err);
      return resolve(data["Item"]);
    });
  });
}
