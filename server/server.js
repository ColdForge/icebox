var express = require('express');
var db = require('./db/config').knex;
var app = express();

var port = process.env.PORT || 8080;
var server = require('http').createServer(app);
server.listen(port);
console.log('Server listening on port:',port);