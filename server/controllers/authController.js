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
		console.log('Inside signin func on Auth Controller', req.user);
        var grammarList = [];
        knex.select('name')
          .from('foods')
          .map(function(food){
          	return food.name;
          })
          .then(function(resp){
            grammarList = resp;
            console.log('grammar', resp);
          }).then(function(resp){
  			knex('icebox_items')
  				.join('foods', 'icebox_items.foodID', '=', 'foods.id')
  	  		.select('icebox_items.daysToExpire as expiration', 'foods.category as foodGroup', 'foods.name as name', 'icebox_items.foodID as foodID')
  	  		.where('icebox_items.iceboxID', req.user.iceboxID)
  	  		.then(function(response){
  	  			console.log('Inside of res being sent', response);
  	  			res.send({
  	  				token: tokenForUser(req.user), 
  	  				id: req.user.id, 
  	  				name: req.user.name, 
  	  				email: req.user.email, 
  	  				iceboxID: req.user.iceboxID, 
  	  				contents: response,
  	  				grammarList: grammarList 
  	  			});
  	  		})
          });
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
				if(response.length > 0){
					return res.status(422).send({ error: 'Email is in use' });
				}
				else {
					knex('auth_users')
						.join('iceboxes', 'auth_users.iceboxID', '=', 'iceboxes.id')
						.select('auth_users.id', 'auth_users.iceboxID', 'iceboxes.user_email')
						.where('auth_users.user_email', user.email)
						.then(function(resp){
							console.log('Auth success', resp);
							if(resp.length > 0){
								//[ { id: 8, iceboxID: 18, user_email: 'nate@makersquare.com' } ]
								user['iceboxID'] = resp[0].iceboxID;
								userController.hashPassword(user)
									.then(function(hash){
										knex('users')
											.insert({
												email: user.email,
												name: user.name,
												password: hash,
												iceboxID: user.iceboxID
											})
											.then(function(response){
												var userObj = Object.assign({ id: response[0]}, user);
												res.json({ token: tokenForUser(userObj), id: response[0], name: user.name, email: user.email, iceboxID: user.iceboxID });
											});
								});
							} else {
								//all other logic
								knex.insert({user_email: user.email})//, icebox_name: user.name + "'s Icebox"})
				  				.into('iceboxes')
				  				.then(function(resp){
				    				user['iceboxID'] = resp[0];
				    				userController.hashPassword(user)
				    					.then(function(hash) {
				      					knex('users')
				        					.insert({
				          					email: user.email,
				          					name: user.name,
				          					password: hash,
				          					iceboxID: user.iceboxID
				        					})
				        				.then(function(response){
				          				var userObj = Object.assign({ id: response[0] }, user );
				          				res.json({ token: tokenForUser(userObj), id: response[0], name: user.name, email: user.email, iceboxID: user.iceboxID });
				          				knex.select('id').from('staples').then(function(resp){
				          					console.log(resp);
				          					resp.forEach(function(id){
				          						knex.insert({stapleID: id.id, iceboxID: user.iceboxID, status: false})
				          						.into('staple_items').then(function(resp){console.log('Staples success', resp);})
				          						.catch(function(err){console.log('Staples error', err);});
				          					});
				          				});
				        				});
				    					})
										});
									}
								});
							}
		});
	}

}

// Helper function to create token for user
function tokenForUser(user) {
	var timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, EnvConfig.SECRET);
}