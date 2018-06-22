# GTM to Git

This allows you to pull down HTML from a GTM container and stores it in a local file system so that you can easily push it into git. The idea is to allow you to have better versioning differences and to fit GTM into a normal Peer Review Cycle. Eventually I would like this to be able to work both directions so that you could transpile your code and push it out to GTM.

## Setup

1. Copy `.template.env` and rename to `.env`
1. You will need to create a Service Account within the [Google Developer Console](https://console.developers.google.com/apis/credentials).
1. Save the key as `JSON`
1. Save the Client Email and Private Key from the JSON downloaded in the previous step into your `.env`

## Resources

### Documentation

- [http://google.github.io/google-api-nodejs-client/modules/_apis_tagmanager_v2_.html](http://google.github.io/google-api-nodejs-client/modules/_apis_tagmanager_v2_.html)

### CLI Research

#### NPM Packages

- commander
- yargs