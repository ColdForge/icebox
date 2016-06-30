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
	addIceboxItems: function(req, res) {
		var user = req.user;
		var foodItems = req.body.foodItems;
    var itemsToAdd = [];
    var recognizedItems = [];
    var noExpirationItems = [];
    var unrecognizedItems = [];
    var counter = 0;
    console.log('user in addIceboxItems is : ',user);
    console.log('items in addIceboxItems is : ',foodItems);

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
                .then(function(result){
                  console.log('Item added to icebox', result);
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
                var responseItem = { name: promiseFoodAPIResponse.name, foodGroup: promiseFoodAPIResponse.foodGroup, expiration: promiseFoodAPIResponse.expiration };
                if(promiseFoodAPIResponse.foodGroup === "N/A"){
                  // unrecognizedItems.push(promiseFoodAPIResponse)
                  unrecognizedItems.push(responseItem)
                  resolve({ name: promiseFoodAPIResponse.name, foodGroup: promiseFoodAPIResponse.foodGroup, expiration: promiseFoodAPIResponse.expiration });
                } else {
                  // noExpirationItems.push(promiseFoodAPIResponse);
                  noExpirationItems.push(responseItem);
                  resolve({ name: promiseFoodAPIResponse.name, foodGroup: promiseFoodAPIResponse.foodGroup, expiration: promiseFoodAPIResponse.expiration });
                  // db.insert({category: promiseFoodAPIResponse.category, name: promiseFoodAPIResponse.name, freshDuration: 10})
                  //   .into('foods')
                  //   .then(function(insertFoodsResponse){
                  //     console.log('Great success', insertFoodsResponse);
                  //     db.insert({foodID: insertFoodsResponse[0], iceboxID: user.iceboxID, daysToExpire: 10})
                  //       .into('icebox_items')
                  //       .where('iceboxID', user.iceboxID)
                  //       .then(function(insertIceboxItemsResponse){
                  //         console.log('Added to icebox items, response: ',insertIceboxItemsResponse);
                  //         resolve({ name: promiseFoodAPIResponse.name });
                  //       });
                  //   })
                  //   .catch(function(err){
                  //     console.log('Insert error', err);
                  //   });
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
        console.log('recognizedItems are : ',recognizedItems);
        console.log('noExpirationItems are : ',noExpirationItems);
        console.log('unrecognizedItems are : ',unrecognizedItems);
        res.status(200).json({
          recognizedItems: recognizedItems,
          noExpirationItems: noExpirationItems,
          unrecognizedItems: unrecognizedItems,
          promisedValues: values,
        })
      });
    }
	},
  clarifyIceboxItems: function(req,res) {
    var user = req.user;
    console.log('req.user in clarifyIceboxItems is : ',req.user);
    console.log('req.body in clarifyIceboxItems is : ',req.body);

    addItems(req.body.foodItems);

    function addItems(itemsArray) {
      var promiseArray = [];

      function promiseItemChecker(item) {
        return new Promise(function(resolve,reject){
          db('foods')
          .insert({ name: item.name, category: item.foodGroup, freshDuration: item.expiration })
          .then(function(result){
            console.log('result of insert into foods is : ',result);
            db('icebox_items')
            .insert({ foodID: result[0], iceboxID: user.iceboxID, daysToExpire: item.expiration })
            .then(function(resp){
              console.log('item inserted into foods then icebox_items, foodID: ',result[0],' iceboxID: ',user.iceboxID)
              resolve({ 
                name: item.name,
                iceboxID: user.iceboxID,
                foodID: result[0],
                itemID: resp,
                foodGroup: item.foodGroup, 
                expiration: item.expiration
              });
            })
            .catch(function(error){
              console.log('Could not insert item into icebox_items table');
              resolve({ name: item.name, error: true });
            })
          })
          .catch(function(error){
            console.log('Could not insert item into foods table');
            resolve({ name: item.name, error: true });
          });
        });
      }

      itemsArray.forEach(function(item, index, array){
        if(item.add){
          promiseArray.push(promiseItemChecker(item));
        }
      });

      Promise.all(promiseArray)
      .then(function(values){
        console.log('values from Promise.all are : ',values);
        res.status(200).json({
          addedItems: values
        })
      });
    }
  },
  removeIceboxItems: function(req, res) {
    console.log('req.user in removeIceboxItems is : ',req.user);
    console.log('req.body in removeIceboxItems is : ',req.body);
    var itemIDs = req.body.items.map(function(item){
      return item.itemID;
    })
    db('icebox_items').del('*').whereIn('id',itemIDs)
    .then(function(result){
      console.log('result from icebox_items del command is : ',result);
      res.send('iceboxItems removed');
    })
    .catch(function(error){
      console.log('error from icebox_items del command is : ',error);
      res.send('iceboxItems removed');
    })
  },
  checkIceboxContentsNative: function(req, res) {
    console.log('req.user in changeIceboxContentsNative is : ',req.user);
    console.log('req.body in changeIceboxContentsNative is : ',req.body);
    var itemsToAdd = req.body.itemString.split(' ');
    var user = req.user;
    var recognizedItems = [];
    var noExpirationItems = [];
    var unrecognizedItems = [];
    var counter = 0;
    console.log('user in changeIceboxContents is : ',user);
    console.log('items in changeIceboxContents is : ',itemsToAdd);

    addItems(itemsToAdd);

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
              resolve({ name: item, foodGroup: resp[0].category, expiration: resp[0].freshDuration });
              // db.insert({foodID: resp[0].id, iceboxID: user.iceboxID, daysToExpire: resp[0].freshDuration})
              //   .into('icebox_items')
              //   .then(function(resp){
              //     console.log('Item added to icebox', resp);
              //     resolve({ name: item, foodGroup: resp[0].category, expiration: resp[0].freshDuration });
              //   })
              //   .catch(function(err){
              //     console.log('Item insertion error', err);
              //     reject({ name: item });
              //   });
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
                  resolve({ name: promiseFoodAPIResponse.name });
                  // db.insert({category: promiseFoodAPIResponse.category, name: promiseFoodAPIResponse.name, freshDuration: 10})
                  //   .into('foods')
                  //   .then(function(insertFoodsResponse){
                  //     console.log('Great success', insertFoodsResponse);
                  //     db.insert({foodID: insertFoodsResponse[0], iceboxID: user.iceboxID, daysToExpire: 10})
                  //       .into('icebox_items')
                  //       .where('iceboxID', user.iceboxID)
                  //       .then(function(insertIceboxItemsResponse){
                  //         console.log('Added to icebox items, response: ',insertIceboxItemsResponse);
                  //         resolve({ name: promiseFoodAPIResponse.name });
                  //       });
                  //   })
                  //   .catch(function(err){
                  //     console.log('Insert error', err);
                  //   });
                }
              })
              .catch(function(err){
                console.log('Error retrieving food type');
                unrecognizedItems.push({ name: item });
                resolve({ name: item });
                // res.send('Error retrieving item');
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
  changeIceboxContentsNative: function(req, res) {
    console.log('req.user in changeIceboxContentsNative is : ',req.user);
    console.log('req.body in changeIceboxContentsNative is : ',req.body);
    var itemsToAdd = req.body.itemString.split(' ');
    var user = req.user;
    var recognizedItems = [];
    var noExpirationItems = [];
    var unrecognizedItems = [];
    var counter = 0;
    console.log('user in changeIceboxContents is : ',user);
    console.log('items in changeIceboxContents is : ',itemsToAdd);

    addItems(itemsToAdd);

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
              // db.insert({foodID: resp[0].id, iceboxID: user.iceboxID, daysToExpire: resp[0].freshDuration})
              //   .into('icebox_items')
              //   .then(function(resp){
              //     console.log('Item added to icebox', resp);
              //     resolve({ name: item, foodGroup: resp[0].category, expiration: resp[0].freshDuration });
              //   })
              //   .catch(function(err){
              //     console.log('Item insertion error', err);
              //     reject({ name: item });
              //   });
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
                  resolve({ name: promiseFoodAPIResponse.name });
                  // db.insert({category: promiseFoodAPIResponse.category, name: promiseFoodAPIResponse.name, freshDuration: 10})
                  //   .into('foods')
                  //   .then(function(insertFoodsResponse){
                  //     console.log('Great success', insertFoodsResponse);
                  //     db.insert({foodID: insertFoodsResponse[0], iceboxID: user.iceboxID, daysToExpire: 10})
                  //       .into('icebox_items')
                  //       .where('iceboxID', user.iceboxID)
                  //       .then(function(insertIceboxItemsResponse){
                  //         console.log('Added to icebox items, response: ',insertIceboxItemsResponse);
                  //         resolve({ name: promiseFoodAPIResponse.name });
                  //       });
                  //   })
                  //   .catch(function(err){
                  //     console.log('Insert error', err);
                  //   });
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
    // console.log('HELPERS 122: getRecipesSugg fired in helpers, req.user is : ',req.user);
    var icebox = req.user.iceboxID;
    var recipeCollect = [];

    db.select('*')
    .from('icebox_items')
    .where('iceboxID', icebox)
    .innerJoin('foods', 'icebox_items.foodID', 'foods.id')
    .then(function(iceboxSelectResult){
      // console.log('iceboxSelectResult from innerJoin is : ');
      iceboxSelectResult.forEach(function(food){
        if(food.daysToExpire <= 5){
          recipeCollect.push(food.name);
        }
      });

      function getRecipeDetailsByID(recipeID) {
        return new Promise(function(resolve,reject){
          foodAPI.getRecipeDetailWithID(recipeID, resolve);
        })
      }

      db.select('*')
        .from('staple_items')
        .innerJoin('staples', 'staple_items.stapleID', 'staples.id')
        .where('iceboxID', icebox)
        .then(function(staplesSelectResult){
          // console.log('Staples', staplesSelectResult);
          staplesSelectResult.forEach(function(staple){
            recipeCollect.push(staple.name);
            // console.log('Recipe collection', recipeCollect);
          });
        })
        .then(function(endResult){
          // console.log('HELPERS 141: resp from select in getRecipes is : ')
          var result = new Promise(function(resolve){
            foodAPI.getRecipeFromIngredients(recipeCollect, resolve);
          })
          .then(function(resp){
            // console.log('HELPERS 145: Successfull call to recipe API');
            // console.log('HELPER DB SELECT RESP IS : ',resp);
            var getRecipeDetailsResults = [];
            var recipeSuggestionsObject = {};
            resp.forEach(function(recipe){
              recipeSuggestionsObject[recipe.id] = recipe;
              getRecipeDetailsResults.push(getRecipeDetailsByID(recipe.id));
            });
            Promise.all(getRecipeDetailsResults)
            .then(function(promisesResponse){
              console.log('promise.all response is : ',promisesResponse);
              var recipeSuggestions = []
              promisesResponse.forEach(function(promisesResponseObject){
                Object.assign(recipeSuggestionsObject[promisesResponseObject.id],
                {
                  cookingMinutes: promisesResponseObject.cookingMinutes,
                  dairyFree: promisesResponseObject.dairyFree,
                  extendedIngredients: promisesResponseObject.extendedIngredients,
                  glutenFree: promisesResponseObject.glutenFree,
                  ketogenic: promisesResponseObject.ketogenic,
                  preparationMinutes: promisesResponseObject.preparationMinutes,
                  readyInMinutes: promisesResponseObject.readyInMinutes,
                  servings: promisesResponseObject.servings,
                  sourceUrl: promisesResponseObject.sourceUrl,
                  spoonacularUrl: promisesResponseObject.spoonacularSourceUrl,
                  sustainable: promisesResponseObject.sustainable,
                  vegan: promisesResponseObject.vegan,
                  vegetarian: promisesResponseObject.vegetarian,
                });
              })
              res.json({ suggestions: resp });
            })
            .catch(function(promisesError){
              console.log('promise.all error is : ',promisesError);
              res.json({ error: promisesError })
            });
          });
        });

      })
      .catch(function(err){
        console.log('HELPERS 149: Error getting items', err);
        res.send('Icebox items could not be found');
      });
  },
  chooseRecipeSuggestion: function(req, res){
    console.log('req.body received in postRecipe is : ',req.body);
    console.log('req.data received in postRecipe is : ',req.data);
    console.log('req.user received in postRecipe is : ',req.user);
    var user = req.user;
    var recipe = req.body.recipe;
    db.insert({ userID: user.id, title: recipe.title,
      pic_url: recipe.image, ingredients_used: recipe.usedIngredientCount,
      ingredients_missing: recipe.missedIngredientCount, recipeID: recipe.id})
      .into('recipes')
      .where('userID', user.id)
      .then(function(resp){
        console.log('Recipe has been added to user account', resp);
        res.json({
          recipesTableID: resp,
          recipe: recipe,
        });
      })
      .catch(function(err){
        console.log('Error posting recipe', err);
        res.send({error: err});
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
    var user = req.user;
    var recipe = req.headers.getid;
    console.log("Helpers, req.headers: ", req.headers)
    var result = new Promise(function(resolve){
      foodAPI.getRecipeDetailWithID(recipe, resolve);
    }).then(function(resp){
      console.log('Recipe ID call successful');
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
		console.log('Hitting db helper for profile info', req.user);

    db.select('*')
      .from('staple_items')
      .innerJoin('staples', 'staple_items.stapleID', 'staples.id')
      .where('staple_items.iceboxID', req.user.iceboxID)
      .then(function(staples){
        console.log('Staples join lookup', staples);
        db.select('*')
          .from('users')
          .where('iceboxID', req.user.iceboxID)
          .then(function(users){
            console.log('Found it', users);
            res.send({ profile: req.user, household: users, staples: staples });
          })
        })
      .catch(function(err){
        console.log('Error getting staples', err);
        res.send('Staples could not be found');
    });

	},

	addUserToIcebox: function(req, res){
		console.log('Hitting addUser db helper with', req.body, req.user);
		db.insert({user_email: req.body.email, iceboxID: req.user.iceboxID})
			.into('auth_users')
			.then(function(resp){
				console.log('Inserted auth_user', resp);
				res.send('Successfully invited user');
			})
			.catch(function(err){
				console.log('Error adding user');
				res.send(err);
			})
	},

  removeUserFromIcebox: function(req, res){
    console.log('Hitting removeUser db helper with', req.body, req.user);
    var removedUser = req.body.user;
    var user = req.user;
    var newID;

    if(user.id === removedUser.id){
      return res.send("Can't remove yourself");
    }

    db.insert({ user_email: removedUser.email})
      .into('iceboxes')
      .then(function(resp){
        console.log('New icebox created', resp);
        newID = resp[0];
        db('users')
          .where('id', removedUser.id)
          .update({
            iceboxID: resp[0],
          })
          .then(function(resp){
            console.log('Updated iceboxID of removed user', resp);
            db.select('*')
              .from('users')
              .where('iceboxID', user.iceboxID)
              .then(function(users){
                console.log('Found it', users);
                res.send({ profile: user, household: users });
                db.select('id')
                  .from('staples')
                  .then(function(resp){
                    console.log('Staples list is being generated', resp, newID);
                    resp.forEach(function(id){
                      db.insert({ stapleID: id.id, iceboxID: newID, status: false}).into('staple_items');
                    });
                  });
              })
          })
      })
      .catch(function(err){
        console.log('Error removing users', err);
      });
  },

	acceptIceboxInvite: function(req, res){
		console.log('Hitting acceptInvite helper in db', req.body);
		var invitedUser = req.body.user
		db('users')
			.where('id', invitedUser.id)
			.update({
				iceboxID: invitedUser.inviteID,
			})
			.then(function(resp){
				console.log('Successfully updated icebox', resp);

				db('icebox_items')
					.join('foods', 'icebox_items.foodID', '=', 'foods.id')
					.select('icebox_items.daysToExpire as expiration', 'foods.category as foodGroup', 
						'foods.name as name', 'icebox_items.foodID as foodID')
					.where('icebox_items.iceboxID', invitedUser.inviteID)
					.then(function(response){
						console.log('Inside of res being sent', response);
						res.send({
							id: invitedUser.id, 
							name: invitedUser.name, 
							email: invitedUser.email, 
							iceboxID: invitedUser.inviteID, 
							contents: response,
						});

						db.select('*')
							.from('auth_users')
							.where('iceboxID', invitedUser.iceboxID)
							.del()
							.then(function(resp){
								console.log('Auth users deleted', resp);
								db.select('*')
									.from('staple_items')
									.where('iceboxID', invitedUser.iceboxID)
									.del()
									.then(function(resp){
									console.log('Staple items deleted', resp);
									db.select('*')
									  .from('iceboxes')
										.where('id', invitedUser.iceboxID)
										.del()
										.then(function(resp){
											console.log('Final icebox deleted', resp);
										});
								});
							}).catch(function(err){
								console.log('Error trashing old icebox');
							});
					});
			})
			.catch(function(err){
				console.log('Error updating icebox', err);
				res.send('Error updating icebox', err);
			});
	},

  updateUserStaples: function(req, res){
    console.log('Hitting updateUsersStaples on db:', req.body);
    var staplesObj = req.body;

    db.select('*')
      .from('staple_items')
      .where('iceboxID', req.user.iceboxID)
      .then(function(resp){
        if(resp.length > 0){
          for(var key in staplesObj){
            db('staple_items')
            .where('iceboxID', req.user.iceboxID)
            .andWhere('stapleID', key)
            .update({
              status: staplesObj[key],
            }).then(function(resp){console.log('updated', resp);})
          }
          res.send('Staples updated successfully');
        } else {
          for(var prop in staplesObj){
            db.insert({stapleID: prop, iceboxID: req.user.iceboxID, status: staplesObj[prop]})
              .into('staple_items')
              .where('iceboxID', req.user.iceboxID)
              .then(function(resp){console.log('added', resp);})
          }
          res.send('Staples added successfully');
        }
      })
      .catch(function(err){
        console.log('Error adding staples', err);
      })
  }

};
