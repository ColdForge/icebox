var db = require('../db/config.js');

module.exports = {

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

	},

	postAllItems: function(req, res){
		var user = req.body.user;
		var items = req.body.items;
    //batch insert

	},

	getItem: function(req, res){
      var user = req.body.user;
      var item = req.params.food_id

      // db.select(item)
      // .from('icebox_item')
      // .where('iceboxID', user.iceboxID)
      // .then(function(resp){
      // 	console.log('Food item retrieved successfully', resp);
      // 	res.send(resp);
      // })
      // .catch(function(err){
      // 	console.log('Food item lookup error', err);
      // 	res.send('Item could not be added');
      // });

	},

	postItem: function(req, res){
    
	  var user = req.body.user;
    var foodName = req.body.food_name;
    var box = req.params.icebox_id

    // db.select('*')
    // .from('foods')
    // .where('name', foodName)
    // .then(function(resp){
    //   console.log('food item found', resp);
    //   db.insert({foodID: resp[0], iceboxID: box, daysToExpire: })
    //   .into('icebox_items')
    //   .then(function(resp){
    //     console.log('Item added to icebox', resp);
    //     res.send('Item added');
    //   })
    //   .catch(function(err){
    //     console.log('Item insertion error', err);
    //   });
    // })
    // .catch(function(err){
    //   console.log('Could not find item in foods table', err);
    //   //lookup items information
    // });

	},

	deleteItem: function(req, res){

	  var user = req.body.user;
    var item = req.params.food_id

      // db.select('*')
      // .from('icebox_items')
      // .where('iceboxID', user.iceboxID)
      // .del()
      // .then(function(resp){
      // 	console.log('Item successfully removed', resp);
      // 	res.send(resp);
      // }).catch(function(err){
      // 	console.log('Item could not be deleted', err);
      // 	res.send('Food item could not be deleted');
      // });

	}

};