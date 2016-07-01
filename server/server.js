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
var Auth = require('./controllers/authController');
var schedule = require('node-schedule');
var app = express();
var food = require('./config/apiutils.js');
var cors = require('cors');
var AWS = require('aws-sdk');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../'));
app.use(cors());

// app.use('/s3', require('react-s3-uploader/s3router')({
//     bucket: "iceboxs3",
//     // region: 'us-east-1', //optional
//     // signatureVersion: 'v4', //optional (use for some amazon regions: frankfurt and others)
//     // headers: {'Access-Control-Allow-Origin': '*'}, // optional
//     ACL: 'private' // this is default
// }));

// var router = require('./routes/router');
// app.use('/api/users', router);
// app.use('/api/icebox', router);

app.use('/api', requireAuth, require('./routes/router'))
// app.use('/api/icebox',require('./routes/router'))


app.get('/', function(req,res) {
  res.sendFile(__dirname + '/../index.html');
});

// route when user signs in
app.post('/user/signin', requireSignin, Auth.signin);

// route when new user signs up
app.post('/user/signup', Auth.signup);

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (req, res){
	res.sendFile(path.resolve(__dirname + '/../index.html'));
})

// router(app);

var rule = new schedule.RecurrenceRule();
rule.hour = 0;
rule.minute = 0;
rule.second = 0;

var j = schedule.scheduleJob(rule, function(){
  console.log('Expiration cron has executed');
  db.select('*')
    .from('icebox_items')
    .then(function(resp){
    	resp.forEach(function(item){
    		db('icebox_items')
    		.where('id', item.id)
    		  .update({daysToExpire: item.daysToExpire-1})
    		  .then(function(resp){
    		  	console.log('Item has been updated');
    		  });
    	});
    })
    .catch(function(err){
    	console.log('Cron job execution error', err);
    });
});


var port = process.env.PORT || 8080;
var server = require('http').createServer(app);
server.listen(port);
console.log('Server listening on port:',port);
