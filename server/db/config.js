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
			food.integer('freshDuration');
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

knex.schema.hasTable('recipes').then(function(exists){
	if(!exists){
		knex.schema.createTable('recipes',function(recipe){
			recipe.increments('id');
			recipe.integer('userID', 11).unsigned();
			recipe.foreign('userID').references('id').inTable('users');
			recipe.string('title',255);
			recipe.varchar('pic_url',255);
			recipe.integer('ingredients_used');
			recipe.integer('ingredients_missing');
			recipe.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
		}).then(function (table) {
      console.log('Created recipes Table', table);
    });
	}
});

knex.schema.hasTable('staples').then(function(exists){
	if(!exists){
		knex.schema.createTable('staples',function(staple){
			staple.increments('id');
			staple.string('category',255);
			staple.string('name',255);
			staple.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
		}).then(function (table) {
      console.log('Created staples Table', table);
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
			item.integer('daysToExpire');
			item.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
		}).then(function (table) {
      console.log('Created icebox_items Table', table);
    });
	}
});

knex.schema.hasTable('staple_items').then(function(exists){
	if(!exists){
		knex.schema.createTable('staple_items',function(item){
			item.increments('id');
			item.integer('stapleID', 11).unsigned();
			item.foreign('stapleID').references('id').inTable('staples');
			item.integer('iceboxID', 11).unsigned();
			item.foreign('iceboxID').references('id').inTable('iceboxes');
			item.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
		}).then(function (table) {
      console.log('Created staple_items Table', table);
    });
	}
});

module.exports = {
	knex: knex
}