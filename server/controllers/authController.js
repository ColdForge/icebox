// All authentication functionality in here
var jwt = require('jwt-simple');
var userController = require('./userController');
var knex = require('../db/config').knex;
// import JWT secret from here
var EnvConfig = require('../db/envConfig');

module.exports = {
	// Signin function:
	// req passed in has user attribute set to false if signin info was wrong or user does not exist, or a user object with all its attributes
	signin: function(req, res, next) {
			res.send({token: tokenForUser(req.user), id: req.user.id, name: req.user.name, email: req.user.email, iceboxID: req.user.iceboxID});
		},

		// Signup function
	signup: function(req, res, next) {

		var email = req.body.email;
		var name = req.body.name;
		var password = req.body.password;

		var user = { email: email, name: name, password: password };

		if(!email || !password) {
		  return res.status(422).send({ error: 'You must provide email and password' });
		}

		knex('users')
		  .select('*')
		  .where('email',email)
		  .then(function(response){
		    console.log('response inside knex select statement: ',response);
		    if(response.length > 0){
		      return res.status(422).send({ error: 'Email is in use' });
		    }
		    else {
		      console.log('response is : ',response);
		        knex.insert({user_email: user.email})
		          .into('iceboxes')
		          .then(function(resp){
		            user['iceboxID'] = resp[0];
		            userController.hashPassword(user).then(function(hash) {
		              knex('users')
		                .insert({
		                  email: user.email,
		                  name: user.name,
		                  password: hash,
		                  iceboxID: user.iceboxID
		                }).then(function(response){
		                  console.log('user is', user);
		                  console.log('response is', response);
		                  var userObj = Object.assign({ id: response }, user );
		                  res.json({ token: tokenForUser(userObj), id: response, name: user.name, email: user.email, iceboxID: user.iceboxID });
		                });
		            })
		        });
		    }
		});
	}

}

// Helper function to create token for user
function tokenForUser(user) {
	console.log('tokenForUser fired');
	console.log('user id in tokenForUser is : ',user.id);
	var timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, EnvConfig.SECRET);
}