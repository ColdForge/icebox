var knex = require('../db/config').knex;
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var _ = require('lodash');

module.exports = {
	insertUser: function(user) {
		var pHash = this.hashPassword;
		return new Promise(function(resolve){
			var result = pHash(user);
			console.log('result insider insertUser: ',result);
			resolve(result);
		})
	},
	hashPassword: function(user) {
		var cipher = Promise.promisify(bcrypt.hash);
		return cipher(user.password, null, null)
			
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