# ice_box

## Start-up

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
  -When committing and making pull requests, style them with proper prefix, lowercase and present tense  


## Server routes

#### All requests to server require a user object including iceboxID.

 Upon signup a user object including iceboxID will be returned to the client,
 like so: 
 ```{token: token, id: user-id, name: 'Andy Yao', email: 'andy@gmail.com', iceboxID: 1}```

 When making a request to GET or DELETE a specific item
 inlcude the food item id on the route.

 When sending any number of items to be posted, they should 
 be an array of item names, like so: ```['milk', 'eggs', 'blueberries', 'steak']```

 After the items have been posted, the server will return an array
 of food objects to the client, like so:

 ```[ { id: 5,
    foodID: 5,
    iceboxID: 1,
    daysToExpire: 4,
    created_at: Mon Jun 13 2016 19:23:41 GMT-0700 (PDT),
    category: 'meat',
    name: 'steak',
    freshDuration: 4 },
  { id: 3,
    foodID: 3,
    iceboxID: 1,
    daysToExpire: 5,
    created_at: Mon Jun 13 2016 19:22:52 GMT-0700 (PDT),
    category: 'fruit',
    name: 'raspberries',
    freshDuration: 5 },
  { id: 1,
    foodID: 1,
    iceboxID: 1,
    daysToExpire: 10,
    created_at: Mon Jun 13 2016 19:22:02 GMT-0700 (PDT),
    category: 'dairy',
    name: 'milk',
    freshDuration: 10 } ]```

 The id and foodID will be equal as this is the result of a join query in the DB.

 A cron job on the server will be updating expiration data so that each time
 a user logs in the information will be up to date.


