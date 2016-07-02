# Icebox
[![Build Status](https://travis-ci.org/ColdForge/icebox.svg?branch=dev)](https://travis-ci.org/ColdForge/icebox)

 Icebox is a food management application that helps you keep track of what groceries you have
 in your refrigerator and when they are going bad. It will suggest recipes to you based on your
 expiring food items, saving you the hassle of deciding what to make for dinner and preventing food
 waste by putting everything to use. It uses voice input to free up your hands for loading groceries
 or preparing meals.

# Icebox Mobile

 Icebox also has a mobile application developed in React-Native to allow users to take their 
 icebox with them while shopping and to increase usability in the kitchen environment following 
 a grocery run.
* [Icebox Mobile App](https://github.com/ColdForge/icebox-native)


### Developer Documentation

#### Tools Used:

* [React](https://facebook.github.io/react/)
* [React-Redux](https://github.com/reactjs/redux)
* [Webpack](https://webpack.github.io/)
* [Babel](https://babeljs.io/)
* [React-Router](https://github.com/rackt/react-router)
* [React-Native](http://www.reactnative.com/)
* [Node](https://nodejs.org/en/)
* [Express](http://expressjs.com/)
* [Knex](http://knexjs.org/)
* [Google Cloud SQL](https://cloud.google.com/sql/docs/)
* [Bootstrap](http://getbootstrap.com/)
* [Neal-React](https://github.com/dennybritz/neal-react)
* [Material-UI](http://www.material-ui.com/#/)
* [Travis-CI](https://travis-ci.org/)
* [Mocha](http://mochajs.org/)
* [Chai](http://chaijs.com/)
* [ES Lint](http://eslint.org/)

#### To begin contributing to icebox:

1. Fork the repo
2. Clone down to your local machine.
3. cd into the repo and open a terminal window
4. Run npm install
5. Open a terminal window and run ```webpack --watch```
6. Open another terminal window and run ```node server/server.js```
7. Open your browser and navigate to localhost:8080
8. Code!
9. Commit changes and make a pull request
  *When committing and making pull requests, style them with:
  1. Proper prefix
  2. Lowercase messages
  3. Present tense  


### Front-end

#### Client-Side Application Structure
  Below is the folder client-side folder structure. All 'smart' components that have
  access to Redux state can be found in the containers folder. All other React class
  and functional components can be found in the components folder. 

  In the reducers folder, all reducers are combined in the index file and action specific
  cases can be found in the individual reducer files. 

```

    src
    ├── actions
    │   └── index.js
    │
    ├── components
    │   ├── app.js
    │   ├── appDrawer.js
    │   ├── appHeader.js
    │   ├── foodItemInput.js
    │   ├── foodItemTable.js
    │   ├── foodItemTableEntry.js
    │   ├── icebox.js
    │   ├── iceboxList.js
    │   ├── iceboxListItem.js
    │   ├── landing.js
    │   ├── main.js
    │   ├── photoUploader.js
    │   ├── recipeListItem.js
    │   ├── recipes.js
    │   ├── recipeSuggestionListItem.js
    │   ├── resolveItemTable.js
    │   ├── resolveItemTableEntry.js
    │   ├── settingsConfirm.js
    │   └── settingsEntry.js
    │
    ├── constants
    │   ├── actions.js
    │   └── sorts.js
    │
    ├── containers
    │   ├── iceboxToolbar.js
    │   ├── recipeList.js
    │   ├── recipeSuggestionList.js
    │   ├── settings.js
    │   ├── signin.js
    │   ├── signup.js
    │   └── visibleIceboxList.js
    │
    ├── reducers
    │   ├── authReducer.js
    │   ├── iceboxReducer.js
    │   ├── iceboxSearchReducer.js
    │   ├── index.js
    │   ├── loadingReducer.js
    │   ├── profileReducer.js
    │   ├── recipesReducer.js
    │   ├── sortByReducer.js
    │   ├── sortOrderReducer.js
    │   └── userReducer.js
    │
    ├── state
    │   ├── configureStore.js
    │   └── localStorage.js
    │
    ├── styles
    │   ├── bootstrap.min.css
    │   ├── icons.js
    │   └── style.css
    │
    └── index.js

```

  Below you will find the React component hierarchy:

```

    index.js
    │
    ├── app.js
    │   │
    │   └── appHeader.js
    │       └── appDrawer.js
    │
    ├── icebox.js
    │   │
    │   ├── iceboxToolbar.js
    │   │   │
    │   │   └── foodItemInput.js
    │   │       │
    │   │       ├── foodItemTable.js
    │   │       │   └── foodItemTableEntry.js
    │   │       │
    │   │       └── resolveItemTable.js
    │   │           └── resolveItemTableEntry.js
    │   │
    │   └── visibleIceboxList.js
    │       │
    │       └── iceboxList.js
    │           └── iceboxListItem.js
    │
    ├── recipes.js
    │   │
    │   ├── recipeList.js
    │   │   └── recipeListItem.js
    │   │
    │   └── recipeSuggestionList.js
    │       └── recipeSuggestionListItem.js
    │
    ├── settings.js
    │   ├── settingsEntry.js
    │   ├── settingsConfirm.js
    │   └── photoUploader.js
    │
    ├── landing.js
    │
    ├── signin.js
    │
    └── signup.js

```

* Inside of the src/index.js file, all top-level components are being routed with
  react-router. Navigation is taking place inside of the App Drawer and through 
  successful actions like signup/signin.

##### Higher order components

* visibleIceboxList.js: takes in contents from redux state and handles sorting/filters
* iceboxToolbar.js: handles voice features and food item inputs
* recipeList.js: takes in past recipe choices from redux state and renders the list
* recipeSuggestionList.js: takes in new recipe suggestions from redux state and handles choice
* settings.js: handles adding/removing users, changing photos, and updating staples inventory
 

### Back-End

#### Server
The Node.js/Express server handles serving static files, routing for signin/signup and applying authentication 
middleware. The server also contains a cron job for nightly updates to food expiration periods in the database. 
All other routing uses database helper functions and is handled in the server/routes/router.js file. Routes 
are matched up to their respective database helpers which can be found in server/config/helpers.js

#### REST/CRUD Outline:

GET:

* /icebox (fetches all icebox contents)
* /icebox/item/:id (route to get specific information on a food item)
* /icebox/pastRecipes (gets users past recipe choices)
* /icebox/recipes (when user gets recipe suggestions)
* /icebox/recipe_details (gets details for specific recipe)
* /profile (route gets users profile info for settings)

POST:

* /icebox/add (adds items to icebox)
* /icebox/resolve (route when users add unidentified items)
* /icebox/remove (route when user removes items)
* /icebox/native-check (route when user adds items to icebox)
* /icebox/native-submit (route when user adds items to icebox)
* /icebox/recipes (route for when choose a recipe suggestion)
* /profile/staples (route to update status of users staple_items)
* /profile/add (route to add new user to icebox)
* /profile/remove (route to remove a user from icebox) 
* /profile/accept (post for user to accept invitation to another icebox)

DELETE:

* /icebox/item:id (remove specific items from icebox)


### Database

  We used Google Coud SQL, which uses MySQL, in order to create relationships between multiple users
  and their shared iceboxes, their associated food items and staples and recipe choices for each user.
  We built our queries using knex.js to be able to interface with the database from our node
  environment in javascript. 

#### Schema

* A visual representation of the schema can be found in the root directory
* Foods and staples are connected to iceboxes through join tables
* Each user has an icebox and their own respective recipes and past recipes
* Each icebox has a list of authorized users who may join that icebox











