var db = require('../db/config.js').knex;
var foodAPI = require('./apiutils.js');
var _each = require('lodash/forEach');

module.exports = {
	fetchIceboxContents: function(req, res){
	  var user = req.body.user;
    console.log('getAllItems called in helpers');
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
	changeIceboxContents: function(req, res) {
		var user = req.user;
		var foodItems = req.body.foodItems;
    var itemsToAdd = [];
    var recognizedItems = [];
    var noExpirationItems = [];
    var unrecognizedItems = [];
    var counter = 0;
    // console.log('user in changeIceboxContents is : ',user);
    // console.log('items in changeIceboxContents is : ',foodItems);
    
    for (var key in foodItems) {
      if(key !== "length" && foodItems[key]){
        itemsToAdd.push(key);
      }
      counter++;
      if(counter === foodItems.length){
        console.log('counter is equal to foodItems.length');
        addItems(itemsToAdd);
      }
    }

    function addItems(itemsArray) {
      var promiseArray = [];

      function promiseItemChecker(item) {
        return new Promise(function(resolve,reject){
          db.select('*')
          .from('foods')
          .where('name', item)
          .then(function(resp){
            if(resp.length > 0) {
              console.log('food item found', resp);
              recognizedItems.push({ name: item, foodGroup: resp[0].category, expiration: resp[0].freshDuration });
              db.insert({foodID: resp[0].id, iceboxID: user.iceboxID, daysToExpire: resp[0].freshDuration})
                .into('icebox_items')
                .then(function(resp){
                  console.log('Item added to icebox', resp);
                  resolve({ name: item, foodGroup: resp[0].category, expiration: resp[0].freshDuration });
                })
                .catch(function(err){
                  console.log('Item insertion error', err);
                  reject({ name: item });
                });
            } else {
              var result = new Promise(function(resolver){
                foodAPI.getFoodType(item, resolver);
              });
              result.then(function(promiseFoodAPIResponse){
                console.log('food item results', promiseFoodAPIResponse);
                if(promiseFoodAPIResponse.error){
                  unrecognizedItems.push(promiseFoodAPIResponse)
                  resolve({ name: promiseFoodAPIResponse.name, error: true });
                } else {
                  noExpirationItems.push(promiseFoodAPIResponse);
                  db.insert({category: promiseFoodAPIResponse.category, name: promiseFoodAPIResponse.name, freshDuration: 10})
                    .into('foods')
                    .then(function(insertFoodsResponse){
                      console.log('Great success', insertFoodsResponse);
                      db.insert({foodID: insertFoodsResponse[0], iceboxID: user.iceboxID, daysToExpire: 10})
                        .into('icebox_items')
                        .where('iceboxID', user.iceboxID)
                        .then(function(insertIceboxItemsResponse){
                          console.log('Added to icebox items, response: ',insertIceboxItemsResponse);
                          resolve({ name: promiseFoodAPIResponse.name });
                        });
                    })
                    .catch(function(err){
                      console.log('Insert error', err);
                    });
                }  
              })
              .catch(function(err){
                console.log('Error retrieving food type');
                res.send('Error retrieving item');
              });
            }
          })
          .catch(function(err){
            console.log('Could not find item in foods table', err);
          });
        });
      }
      
      itemsArray.forEach(function(item, index, array){
        promiseArray.push(promiseItemChecker(item));
      });

      Promise.all(promiseArray)
      .then(function(values){
        console.log('values from Promise.all are : ',values);
        res.status(200).json({
          recognizedItems: recognizedItems,
          noExpirationItems: noExpirationItems,
          unrecognizedItems: unrecognizedItems
        })
      });
    }
	},
  getRecipeSuggestions: function(req, res){
    console.log('getRecipes fired in helpers, req.user is : ',req.user);
    var icebox = req.user.iceboxID;
    var recipeCollect = [];

    db.select('*')
    .from('icebox_items')
    .where('iceboxID', icebox)
    .innerJoin('foods', 'icebox_items.foodID', 'foods.id')
    .then(function(resp){
      console.log('resp from innerJoin is : ',resp);
      resp.forEach(function(food){
        if(food.daysToExpire <= 3){
          recipeCollect.push(food.name);
        }
      });
    }).then(function(resp){
      console.log('resp from select in getRecipes is : ',resp)
      var result = new Promise(function(resolve){
        foodAPI.getRecipeFromIngredients(recipeCollect, resolve);
      }).then(function(resp){
        console.log('Successfull call to recipe API', resp);
        res.send(resp);
      });
    }).catch(function(err){
      console.log('Error getting items', err);
      res.send('Icebox items could not be found');
    });

  },
  chooseRecipeSuggestion: function(req, res){
    console.log('req.body received in postRecipe is : ',req.body);
    console.log('req.data received in postRecipe is : ',req.data);
    console.log('req.user received in postRecipe is : ',req.user);
    var user = req.user;
    var recipe = req.body.recipe;

    db.insert({ iceboxID: user.iceboxID, recipeID: recipe.id, title: recipe.title,
      pic_url: recipe.pic_url, ingredients_used: recipe.ingredients_used,
      ingredients_missing: recipe.ingredients_missing})
      .into('recipes')
      .where('userID', user.id)
      .then(function(resp){
        console.log('Recipe has been added to user account', resp);
        res.send(resp);
      })
      .catch(function(err){
        console.log('Error posting recipe', err);
      });
  },
  //working on this section - AY - add ability to get recipe history
	getPreviousRecipes: function(req, res){
		var user = req.body.user;

		db.select('*')
			.from('recipes')
			.where('userID', id)
			.then(function(resp){
				console.log('Previous Recipe request call successful', resp);
				res.send(resp);
			}).catch(function(err){
				console.log('Error getting items', err);
				res.send('Previous recipes could not be found');
			});
	},
  getRecipeDetails: function(req, res){
    var user = req.body.user;
    var recipe = req.body.recipe;

    var result = new Promise(function(resolve){
      foodAPI.getRecipeDetailWithID(recipe.id, resolve);
    }).then(function(resp){
      console.log('Recipe ID call successful', resp);
      res.send(resp);
    }).catch(function(err){
      console.log('Error retrieving recipe details', err);
      res.send('Error retrieving recipe details');
    });
  },
	getIceboxItem: function(req, res){
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
	deleteIceboxItem: function(req, res){
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
	},

  getUserProfile: function(req, res){
    console.log('Hitting db helper for profile info');
    res.send({name: 'Mad Max', email: 'madmofo@gmail.com'});
    //db.select('*').from('users').where('id', )
  }

};
