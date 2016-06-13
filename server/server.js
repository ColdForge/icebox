var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var db = require('./db/config').knex;
var passportService = require('./config/passport');
var passport = require('passport');
var userController = require('./controllers/userController');
var requireAuth = passport.authenticate('jwt', {session: false});
var requireSignin = passport.authenticate('local', {session: false});
var router = require('./routes/router');
var Auth = require('./controllers/authController');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../'));
app.use('/api/users', router);
app.use('/api/icebox', router);

app.get('/', function(req,res) {
  res.sendFile(__dirname + '../index.html');
});

// route when user signs in
app.post('/user/signin', requireSignin, Auth.signin);

// route when new user signs up
app.post('/user/signup', Auth.signup);

// db.select('*')
//     .from('foods')
//     .where('name', foodName)
//     .then(function(resp){
//       console.log('food item found', resp);
//       db.insert({foodID: resp[0], iceboxID: box, daysToExpire: })
//       .into('icebox_items')
//       .then(function(resp){
//         console.log('Item added to icebox', resp);
//         res.send('Item added');
//       })
//       .catch(function(err){
//         console.log('Item insertion error', err);
//       });
//     })
//     .catch(function(err){
//       console.log('Could not find item in foods table', err);
//       //lookup items information
//     });




var port = process.env.PORT || 8080;
var server = require('http').createServer(app);
server.listen(port);
console.log('Server listening on port:',port);