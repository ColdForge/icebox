// var request = require ('request');
var request = require('request-promise');
var API_KEY = require ('./apikeys');

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

var SPOONACULAR = {
  BASE: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/",
  CLASSIFY: "food/products/classify",
  CLASSIFY_BATCH: "food/products/classifyBatch",
  FIND_BY_INGREDIENTS: "recipes/findByIngredients",
  FIND_BY_INGREDIENTS_TAIL: "&limitLicense=false&number=3&ranking=1",
  RECIPE_INFORMATION: "recipes/",
  RECIPE_INFORMATION_TAIL: "/information?includeNutrition=false"
};

var USDA = {
  BASE: "http://api.nal.usda.gov/ndb/reports/"
};

module.exports = {
  getRecipeFromIngredients : function (fooditems, cb) {
    var foodItemsParam = fooditems.join(',');
    var options = {
      url : SPOONACULAR.BASE+SPOONACULAR.FIND_BY_INGREDIENTS,
      headers: {
        "X-Mashape-Key" : API_KEY.SPOONACULAR,
        "Accept" : "application/json"
      },
      qs: {
        fillIngredients: "true",
        ingredients: foodItemsParam,
        limitLicense: "false",
        number: "3",
        ranking: "1"
      },
      json: true
    }
    request(options)
      .then(function(response){
        console.log('response from getRecipeFromIngredients is : ',response);
        cb(response);
      })
      .catch(function(error){
        console.log('error from getRecipeFromIngredients is : ',error);
      })
  },
  getRecipeDetailWithID : function (recipeID, cb) {
    var options = {
      url : RECDETAIL_QUERY+recipeID+"/information?includeNutrition=false",
      headers: {
        "X-Mashape-Key" : API_KEY.SPOONACULAR,
      }
    }

    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        console.log ("getRecipeDetail Callback: ", info);
        cb(info);
      }
    }

    request(options, callback);
  },
  getFoodType : function (food, cb) {
    console.log('API call is firing');
    var options = {
      method: 'POST',
      headers: {
        "X-Mashape-Key" : API_KEY.SPOONACULAR,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      uri: SPOONACULAR.BASE + SPOONACULAR.CLASSIFY,
      body: {
        "title": food,"upc":"","plu_code":""
      },
      json: true
    };

    var matchFoodGroup = this.matchFoodGroup;
    
    request(options)
      .then(function(response){
        // console.log('response in getFoodType request of : ',response);
        if(!response.usdaCode){
          cb({ name: response.cleanTitle, category: "error" });
        } else {
          var usdaCode = response.usdaCode.toString();
          if(usdaCode.length < 5){
            usdaCode = ("0"+usdaCode).toString();
          }
          var optionsUSDA = {
            method: 'GET',
            url: USDA.BASE,
            qs: {
              ndbno: usdaCode,
              type: "f",
              format: "json",
              api_key: API_KEY.USDA
            },
            json: true
          };
          request(optionsUSDA)
            .then(function(responseUSDA){
              console.log('responseUSDA in getFoodType request of : ',responseUSDA);
              var foodGroup = matchFoodGroup(responseUSDA.report.food.fg);
              console.log('foodGroup in responseUSDA is : ',foodGroup);
              cb({
                name: response.cleanTitle,
                foodGroup: foodGroup,
                expiration: undefined
              });
            })
            .catch(function(errUSDA){
              console.log('err in getFoodType USDA request of : ',errUSDA.message);
              cb({ 
                name: response.cleanTitle, 
                foodGroup: "N/A", 
                expiration: undefined, 
                error: "Unable to find food in USDA database"
              });
            })
        }
      })
      .catch(function(err){
        console.log('err in getFoodType request of : ',err.message);
        cb({
          name: response.cleanTitle,
          foodGroup: "N/A",
          expiration: undefined,
          error: "Unable to find food in Spoonacular database"
        });
      })
  },
  matchFoodGroup: function(input) {
    input = input.toString().toLowerCase();
    if(input.includes('dairy')){
      return 'Dairy';
    } else if (input.includes('vegetables')) {
      return 'Vegetables';
    } else if (input.includes('fruit')) {
      return 'Fruit';
    } else if (input.includes('poultry')) {
      return 'Poultry';
    } else if (input.includes('pork')) {
      return 'Pork';
    } else if (input.includes('beef')) {
      return 'Beef';
    } else if (input.includes('finfish')) {
      return 'Seafood';
    } else if (input.includes('cereal')) {
      return 'Grains';
    } else if (input.includes('sauces')) {
      return 'Sauces';
    } else if (input.includes('legumes')) {
      return 'Legumes';
    } else if (input.includes('sweets')) {
      return 'Sweets';
    } else if (input.includes('snacks')) {
      return 'Snacks';
    } else if (input.includes('oils')) {
      return 'Oils';
    } else if (input.includes('baked')) {
      return 'Grains';
    } else if (input.includes('beverages')) {
      return 'Beverages';
    } else if (input.includes('lamb')) {
      return 'Lamb';
    } else if (input.includes('nut')) {
      return 'Nuts';
    } else if (input.includes('entrees')) {
      return 'Sides';
    } else if (input.includes('sausages')) {
      return 'Meats';
    } else {
      return 'N/A';
    }
  }
//closes the module
}


