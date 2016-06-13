var knex = require('../db/config').knex;
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var _ = require('lodash');

module.exports = {
	insertUser: function(user) {
		var pHash = Promise.promisify(hashPassword);
		return pHash(user);
	},
	hashPassword: function(user) {
		var cipher = Promise.promisify(bcrypt.hash);
		return cipher(user.password, null, null)
			.then(function(hash) {
				knex('users')
					.insert({
						email: user.email,
						name: user.name,
						password: hash
					})
					.then(function(response){
						console.log('inside hashPassword insert, response is : ',response);
					})
			})
	},
	comparePassword: function(testPassword, user, callback) {
		console.log('comparePassword called in userController with testPassword: ',testPassword,' and user: ',user);
		var cipher = Promise.promisify(bcrypt.compare);
		return cipher(testPassword, user.password, function(err, isMatch) {
			if(err) { return callback(err); }
			callback(null,isMatch);
		});
	}

}