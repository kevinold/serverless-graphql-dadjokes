'use strict';

var _graphql = require('graphql');
var _dynamo = require('./dynamo');

var Author = new _graphql.GraphQLObjectType({
  name: "Author",
  description: "Author of the joke",
  fields: function fields() {
    return {
      id: { type: _graphql.GraphQLString },
      name: { type: _graphql.GraphQLString }
    };
  }
});

var Joke = new _graphql.GraphQLObjectType({
  name: "Joke",
  description: "The Joke",
  fields: function fields() {
    return {
      id: { type: _graphql.GraphQLString },
      body: { type: _graphql.GraphQLString },
      author: {
        type: Author,
        resolve: function resolve(source) {
          var id = source.id;
          return _dynamo.getJokeAuthor(id);
        }
      }
    };
  }
});

var Query = new _graphql.GraphQLObjectType({
  name: "DadJokes",
  description: "Dad Jokes!!!",
  fields: function fields() {
    return {
      allJokes: {
        type: new _graphql.GraphQLList(Joke),
        description: "List of all Dad Jokes",
        resolve: function resolve(source) {
          return _dynamo.getAllJokes();
        }
      }
    };
  }
});

var Schema = new _graphql.GraphQLSchema({
  query: Query
});

module.exports = Schema;
