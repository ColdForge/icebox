// All authentication functionality in here
var jwt = require('jwt-simple');
var userController = require('./userController');
var db = require('../db/config').knex;
// import JWT secret from here
var EnvConfig = require('../config/envConfig');

module.exports = {
	// Signin function:
	// req passed in has user attribute set to false if signin info was wrong or user does not exist, or a user object with all its attributes
	signin: function(req, res, next) {
		res.send({ token: tokenForUser(req.user), name: req.user.attributes.name, email: req.user.attributes.email });
	},

	// Signup function
	signup: function(req, res, next) {
		var email = req.body.email;
		var name = req.body.name;
		var password = req.body.password;
		var profilePic = req.body.profile_url;

		if(!email || !password) {
			return res.status(422).send({ error: 'You must provide email and password' });
		}

		knex('users')
			.select('*')
			.where('email',email)
			.then(function(response){
				if(response.length !== 0){
					return res.status(422).send({ error: 'Email is in use' });
				}
				console.log('response is : ',response);
				userController.insertUser(response[0])
					.then(function(response){
						console.log('New user created in authController.signup!');
						console.log('response is : ',response);
						res.json({ token: tokenForUser(user) });
					})
			})
	}	
}

// Helper function to create token for user
function tokenForUser(user) {
	console.log('tokenForUser fired');
	console.log('user id in tokenForUser is : ',user.id);
	var timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, EnvConfig.SECRET);
}