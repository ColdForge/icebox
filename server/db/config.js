import Config from './envConfig';

var knex = require('knex')({
	client: 'mysql',
	connection: {
		host: Config.MYSQL_HOST,
		user: Config.MYSQL_USER,
		password: Config.MYSQL_PASSWORD,
		database: "icebox",
		charset		: 'utf8'
	}
});

knex.schema.hasTable('users').then(function(exists){
	if(!exists){
		knex.schema.createTable('users',function(user){
			user.increments('id').primary();
			user.string('name',255);
			user.varchar('email',255);
			user.varchar('password',255);
			user.integer('fridgeID',11);
			user.timestamps();
		}).then(function (table) {
      console.log('Created users Table', table);
    });
	}
});

module.exports = {
	knex: knex
}