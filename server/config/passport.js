var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy = require('passport-local');
var db = require('../db/config').knex;
var EnvConfig = require('../db/envConfig');
var userController = require('../controllers/userController');

// Create local strategy
var localOptions = { usernameField: 'email' };
var localLogin = new LocalStrategy(localOptions, function(email, password, done) {
	console.log('localLogin strategy used');
	// Verify this username and password, call done with the user
	// if it is the correct email and password
	// otherwise, call done with false
	db('users')
		.select('*')
		.where('email',email)
		.then(function(response){
			if(response.length === 0){
				console.log('user not found');
				console.log(response);
				return done(null,false);
			}
			var user = response[0];
			console.log('response length > 0, response is : ',response);
			userController.comparePassword(password, user, function(err, isMatch){
				if (err) {
					console.log('err inside localLogin comparePassword');
					return done(err);
				}
				if (!isMatch) {
					console.log('localLogin, comparePassword not a match!');
					return done(null, false);
				}
				console.log('inside localLogin comparePassword user info is : ', user);
				return done(null, user);
			});
		})
});

// Setup options for JWT Strategy
var jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: EnvConfig.SECRET
};

// Create JWT strategy
var jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
	// See if the user ID in the payload exists in our database
	// If it does, call 'done' with that other
	// otherwise, call 'done' without a user object
	db('users')
		.select('*')
		.where('id',payload.sub)
		.then(function(response){
			if(response.length === 0){
				done(null, false);
			}
			console.log('response length > 0, response is : ');
			done(null,response[0]);
		});
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
