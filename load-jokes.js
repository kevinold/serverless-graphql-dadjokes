var AWS = require("aws-sdk");
//var fs = require('fs');
//var faker = require('faker');
//var lodash = require('lodash');

AWS.config.update({ region: "us-east-1" });

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing data into DynamoDB. Please wait.");
var allJokes= [
  {
    id: "1",
    body: "What do you call a fish with no eyes?  A: Ffffsssssshhhhhhhhh!",
    author: "1"
  },
  {
    id: "2",
    body: "Stealing someone's coffee is called mugging.",
    author: "2"
  },
  {
    id: "3",
    body: "Why did the chicken cross the road?  A: To get to the other side",
    author: "2"
  },
  {
    id: "4",
    body: "The other day I held the door open for clown.  It was a nice jester.",
    author: "3"
  },
  {
    id: "5",
    body: "Whoever invented 'knock-kock' jokes should get a no-bell prize",
    author: "1"
  }
];

var allAuthors = [
  {
    id: "1",
    name: "T. Jones"
  },
  {
    id: "2",
    name: "B. Smith"
  },
  {
    id: "3",
    name: "C. Williams"
  }
];


allJokes.forEach(function(joke) {
    var params = {
        TableName: "serverless-graphql-dadjokes-jokes-dev",
        Item: {
            "id":  joke.id,
            "body": joke.body,
            "author": joke.author
        }
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add:", joke.id, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", joke.id);
       }
    });
});

allAuthors.forEach(function(author) {
    var params = {
        TableName: "serverless-graphql-dadjokes-jokeauthors-dev",
        Item: {
            "id":  author.id,
            "name": author.name
        }
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add:", author.id, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", author.id);
       }
    });
});
