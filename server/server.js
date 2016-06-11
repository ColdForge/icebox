var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var db = require('./db/config').knex;

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../'));

app.get('/', function(req,res) {
  res.sendFile(__dirname + '../index.html');
});

var port = process.env.PORT || 8080;
var server = require('http').createServer(app);
server.listen(port);
console.log('Server listening on port:',port);