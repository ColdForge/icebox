var db = require('../db/config.js');

module.exports = {

	createUser: function(req, res){

		var userInfo = {
    	  name: req.body.name,
    	  email: req.body.email,
    	  password: req.body.password
        };

		db.insert({user_email: user.email})
		.into('iceboxes')
		.then(function(resp){
			console.log('icebox created', resp);
			userInfo['iceboxID'] = resp[0];
          db.insert({name: user.name, email: user.email, password: user.password, iceboxID: resp[0]})
          .into('users')
          .then(function(resp){
            console.log('user created', resp);
            res.send(userInfo);
          }).catch(function(err){
          	console.log('Insert user error', err);
          	res.send('User profile could not be created');
          });
		}).catch(function(err){
			console.log('Insert icebox error', err);
			res.send('Icebox could not be created');
		});

	}

	signIn: function(req, res){

	  var user = req.body.user;

      db.select('*')
      .from('users')
      .where('email', user.email)
      .then(function(resp){
      	if(resp.password === user.password){
      		console.log('user found', resp);
      		res.status(200).send('User signin successful');
      	}
      }).catch(function(err){
      	console.log('Signin lookup error', err);
      	res.status(404).send('User not found');
      });

	}

	signOut: function(req, res){
      
	}

	getAllItems: function(req, res){

	  var user = req.body.user;

      db.select('*')
      .from('icebox_items')
      .where('iceboxID', user.iceboxID)
      .then(function(resp){
        console.log('Retrieved icebox items', resp);
        res.send(resp);
      })
      .catch(function(err){
      	console.log('Icebox items lookup error', err);
      	res.send('Icebox items could not be found');
      });

	}

	postAllItems: function(req, res){
		var user = req.body.user;
		var items = req.body.items;
        //batch insert

	}

	getItem: function(req, res){
      var user = req.body.user;
      var item = req.params.food_id

      db.select(item)
      .from('icebox_item')
      .where('iceboxID', user.iceboxID)
      .then(function(resp){
      	console.log('Food item retrieved successfully', resp);
      	res.send(resp);
      })
      .catch(function(err){
      	console.log('Food item lookup error', err);
      	res.send('Item could not be added');
      });

	}

	postItem: function(req, res){
    
	  var user = req.body.user;
      var item = req.params.food_id

      db.insert({foodID: item})
      .into('icebox_items')
      .then(function(resp){
      	console.log('Food item added successfully', resp);
      	res.send(resp);
      }).catch(function(err){
      	console.log('Food item could not be added', err);
      	res.send('Food item could not be added');
      });

	}

	deleteItem: function(req, res){

	  var user = req.body.user;
      var item = req.params.food_id

      db.select('*')
      .from('icebox_items')
      .where('iceboxID', user.iceboxID)
      .del()
      .then(function(resp){
      	console.log('Item successfully removed', resp);
      	res.send(resp);
      }).catch(function(err){
      	console.log('Item could not be deleted', err);
      	res.send('Food item could not be deleted');
      });

	}

};