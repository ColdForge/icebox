var Config = require('./envConfig');

var knex = require('knex')({
	client: 'mysql',
	connection: {
		host      : Config.MYSQL_HOST,
		user      : Config.MYSQL_USER,
		password  : Config.MYSQL_PASSWORD,
		database  : "icebox",
		charset		: 'utf8'
	}
});

knex.schema.hasTable('iceboxes').then(function(exists){
	if(!exists){
		knex.schema.createTable('iceboxes',function(icebox){
			icebox.increments('id').primary();
			icebox.varchar('user_email', 255);
			icebox.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
		}).then(function (table) {
      console.log('Created iceboxes Table', table);
    });
	}
});

knex.schema.hasTable('foods').then(function(exists){
	if(!exists){
		knex.schema.createTable('foods',function(food){
			food.increments('id').primary();
			food.varchar('category', 255);
			food.varchar('name', 255);
			food.datetime('expiration');
			food.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
		}).then(function (table) {
      console.log('Created foods Table', table);
    });
	}
});

knex.schema.hasTable('users').then(function(exists){
	if(!exists){
		knex.schema.createTable('users',function(user){
			user.increments('id');
			user.string('name',255);
			user.varchar('email',255);
			user.varchar('password',255);
			user.integer('iceboxID', 11).unsigned();
			user.foreign('iceboxID').references('id').inTable('iceboxes');  //post.integer('user_id').unsigned().references('users.id')
			user.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
		}).then(function (table) {
      console.log('Created users Table', table);
    });
	}
});

knex.schema.hasTable('icebox_items').then(function(exists){
	if(!exists){
		knex.schema.createTable('icebox_items',function(item){
			item.increments('id');
			item.integer('foodID', 11).unsigned();
			item.foreign('foodID').references('id').inTable('foods');
			item.integer('iceboxID', 11).unsigned();
			item.foreign('iceboxID').references('id').inTable('iceboxes');
			item.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
		}).then(function (table) {
      console.log('Created icebox_items Table', table);
    });
	}
});

module.exports = {
	knex: knex
}