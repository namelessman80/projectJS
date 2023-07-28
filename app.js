const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId} = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON data from the request body
//sets up the application to parse incoming JSON data in the request body, making it accessible via req.body in the route handlers
//use the body-parser middleware to parse incoming JSON data in the HTTP request body.
//When a client makes an HTTP POST or PUT request and sends JSON data in the request body, the server needs to parse that JSON data to access and use it in the application.
app.use(bodyParser.json());

// MongoDB setup
const dbURI = 'mongodb://localhost:27017';
const dbName = 'bulletin_board_db';

MongoClient.connect(dbURI, { useUnifiedTopology: true })
  .then(client => {   //The client is the MongoDB client object that represents the connection to the MongoDB server. It is obtained as a parameter to the callback function.
    const db = client.db(dbName);  //The client.db() accesses to database in the MongoDB server. It returns a reference to that database.                                 
    console.log('Connected to MongoDB');  //db is the reference of database

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });

    // Routes
        //Here, (db) is used to call the function that is exported by the ./routes/posts module. In Node.js, when a module exports a function, it can be called immediately after requiring the module by using parentheses ().
        const postRoutes = require('./routes/posts')(db);
        app.use('/posts', postRoutes); //the routes defined in postRoutes will handle incoming HTTP requests with the base URL path '/posts'.
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
