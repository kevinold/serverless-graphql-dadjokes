
Setup with [AWS as a provider is required](https://github.com/serverless/serverless/blob/master/docs/guide/provider-account-setup.md)

Then:

```
npm install -g serverless@beta
```

Inside this repo:

```
npm install

serverless deploy
```

Loading jokes into DynamoTables:

```
node load-jokes.js
```

