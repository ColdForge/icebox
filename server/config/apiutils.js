var request = require ('request');
var key = require ('./apikeys');

// API Query Strings RECQUERY and RECQUERY_TAIL get the suggested recipe list
// based on a list of ingredients passed into the function

var RECQUERY = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/" +
  "recipes/findByIngredients?fillIngredients=true&ingredients=";
var RECQUERY_TAIL = "&limitLicense=false&number=5&ranking=1";

// This gets a specific recipe based on the recipeID
var RECDETAIL_QUERY = "https://spoonacular-recipe-food-nutrition-" +
  "v1.p.mashape.com/recipes/";

var FOODTYPE = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/"+
  "recipes/parseIngredients";

module.exports = {

  getRecipeFromIngredients : function (fooditems, cb) {

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
            console.log('This is API response', info);
            cb(info);
          }

    }
    request(options, callback);

  },


  getRecipeDetailWithID : function (recipeID) {
    var options = {
      url : RECDETAIL_QUERY+recipeID+"/information?includeNutrition=false",
      headers: {
        "X-Mashape-Key" : key.RECIPE_KEY,
      }
    }

    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        console.log ("getRecipeDetail Callback: ", info);
      }
    }

    request (options, callback);
  },

  getFoodType : function (food) {
    var options = {
      url : FOODTYPE,
      headers: {
        "X-Mashape-Key" : key.RECIPE_KEY,
      },
      form : {"ingredientList" : food,
              "servings": 2}
    }

    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        console.log ("getFoodType Callback: ", info);
      }
    }

    request.post (options, callback);

  }


//closes the module
}


