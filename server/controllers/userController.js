var db = require('../db/config').knex;
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var _ = require('lodash');

module.exports = {
	comparePassword: function(testPassword, user, callback) {
		console.log('comparePassword called in userController with testPassword: ',testPassword,' and user: ',user);
		var cipher = Promise.promisify(bcrypt.compare);
		return cipher(testPassword, user.password, function(err, isMatch) {
			if(err) { return callback(err); }
			callback(null,isMatch);
		});
	}

}