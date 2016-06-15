var request = require ('request');
var key = require ('./apikeys');

// API Query Strings RECQUERY and RECQUERY_TAIL get the suggested recipe list
// based on a list of ingredients passed into the function

var RECQUERY = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/" +
  "recipes/findByIngredients?fillIngredients=true&ingredients="
var RECQUERY_TAIL = "&limitLicense=false&number=5&ranking=1"

// This gets a specific recipe based on the recipeID
var RECDETAIL_QUERY = "https://spoonacular-recipe-food-nutrition-" +
  "v1.p.mashape.com/recipes/{id}/information"

var FOODTYPE = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/"+
  "recipes/parseIngredients"

module.exports = {

  getRecipeListFromIngredients : function (fooditems) {
    var ingredQueryString = fooditems.join('%2C');
    var options = {
      url : RECQUERY+ingredQueryString+RECQUERY_TAIL,
      headers: {
        "X-Mashape-Key" : key.RECIPE_KEY,
        "Accept" : "application/json"
      }
    }

    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        console.log (info);
      }
    }

  request (options, callback);
  },


  getRecipeDetailWithID : function (recipeID) {


  },

  getFoodType : function (food) {


  }


//closes the module
}


