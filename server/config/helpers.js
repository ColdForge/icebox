var db = require('../db/config.js');
var foodAPI = require('./apiutils.js');

module.exports = {

	getAllItems: function(req, res){
	  var user = req.body.user;

    db.select('*')
    .from('icebox_items')
    .where('iceboxID', user.iceboxID)
    .innerJoin('foods', 'icebox_items.foodID', 'foods.id')
    .then(function(resp){
      console.log('Join lookup', resp);
      res.send(resp);
    }).catch(function(err){
      console.log('Error getting items', err);
      res.send('Icebox items could not be found');
    });

	},

	postAllItems: function(req, res){
		var user = req.body.user;
		var items = req.body.data;
    //var items = ['milk', 'eggs', 'blueberries', 'steak'];

    items.forEach(function (item){
      db.select('*')
      .from('foods')
      .where('name', item)
      .then(function(resp){
        console.log('food item found', resp);
        db.insert({foodID: resp[0].id, iceboxID: user.iceboxID, daysToExpire: resp[0].freshDuration})
        .into('icebox_items')
        .then(function(resp){
          console.log('Item added to icebox', resp);
        })
        .catch(function(err){
          console.log('Item insertion error', err);
        });
      })
      .catch(function(err){
        console.log('Could not find item in foods table', err);
        //lookup items information from API
      });
    });

    res.send("Icebox items updated");
	},

  getRecipes: function(req, res){
    var icebox = req.body.iceboxID;
    var recipeCollect = [];

    db.select('*')
    .from('icebox_items')
    .where('iceboxID', icebox)
    .innerJoin('foods', 'icebox_items.foodID', 'foods.id')
    .then(function(resp){
      resp.forEach(function(food){
        if(food.daysToExpire <= 2){
          recipeCollect.push(food.name);
        }
      });
    }).then(function(resp){
      var result = new Promise(function(resolve){
        foodAPI.getRecipeFromIngredients(recipeCollect, resolve);
      }).then(function(resp){
        console.log('Successfull call to recipe API', API);
        res.send(resp);
      });
    }).catch(function(err){
      console.log('Error getting items', err);
      res.send('Icebox items could not be found');
    });

  },

  postRecipe: function(req, res){
    var user = req.body.user;
    var recipe = req.body.data;

    db.insert({iceboxID: user.iceboxID, title: recipe.title, 
      pic_url: recipe.pic_url, ingredients_used: recipe.ingredients_used, 
      ingredients_missing: recipe.ingredients_missing})
      .into('users')
      .where('users.email', user.email)
      .then(function(resp){
        console.log('Recipe has been added to user account', resp);
        res.send(resp);
      })
      .catch(function(err){
        console.log('Error posting recipe', err);
      });
  },

	getItem: function(req, res){
      var user = req.body.user;
      var item = req.params.food_id

      db.select('*')
      .from('icebox_items')
      .where('iceboxID', user.iceboxID)
      .andWhere('foodID', item)
      .innerJoin('foods', 'icebox_items.foodID', 'foods.id' )
      .then(function(resp){
      	console.log('Food item retrieved successfully', resp);
      	res.send(resp);
      })
      .catch(function(err){
      	console.log('Food item lookup error', err);
      	res.send('Item could not be added');
      });

	},

	postItem: function(req, res){

	  var user = req.body.user;
    var item = req.body.data;

    db.select('*')
    .from('foods')
    .where('name', item)
    .then(function(resp){
      console.log('food item found', resp);
      db.insert({foodID: resp[0].id, iceboxID: user.iceboxID, daysToExpire: resp[0].freshDuration})
      .into('icebox_items')
      .then(function(resp){
        console.log('Item added to icebox', resp);
        res.send('Item added');
      })
      .catch(function(err){
        console.log('Item insertion error', err);
      });
    })
    .catch(function(err){
      console.log('Could not find item in foods table', err);
      //lookup items information from API
    });

	},

	deleteItem: function(req, res){

	  var user = req.body.user;
    var item = req.params.food_id

    db.select('*')
    .from('icebox_items')
    .where('iceboxID', user.iceboxID)
    .andWhere('id', item)
    .del()
    .then(function(resp){
      console.log('Item successfully removed', resp);
      res.send('Item successfully removed');
    }).catch(function(err){
      console.log('Item could not be deleted', err);
      res.send('Food item could not be deleted');
    });

	}

};
