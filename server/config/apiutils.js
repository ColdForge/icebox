var request = require ('request');
var key = require ('./apikeys');
var QUERY = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/" +
  "recipes/findByIngredients?fillIngredients=true&ingredients="
var QUERY_TAIL = "&limitLicense=false&number=5&ranking=1"


module.exports = {

  getRecipeFromIngredients : function (fooditems) {
    var ingredQueryString = fooditems.join('%2C');
    var options = {
      url : QUERY+ingredQueryString+QUERY_TAIL,
      headers: {
        "X-Mashape-Key" : key.RECIPE_KEY,
        "Accept" : "application/json"
      }
    }

    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    }

  }

  return request (options, callback);
  }
}
