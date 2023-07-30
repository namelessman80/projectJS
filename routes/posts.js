// routes/posts.js
const express = require('express');
const router = express.Router();
const { ObjectId} = require('mongodb');

module.exports = (db) => { //Exporting a function that takes a parameter db, which represents the MongoDB database connection.
  const postCollection = db.collection('posts'); //postCollection stores a reference.
                                                 //Cursor: A pointer to the result set of a query. 

  // Route to create a new post
  router.post('/', async (req, res) => {
    try {
      const { title, content } = req.body; //request ttitle and content data from body
      const newPost = { title, content };  //create post with key title and content
      const result = await postCollection.insertOne(newPost);
      //res.json(result.ops[0]);  //res.json() send json response. 'ops' property is an array that stores the documents that were inserted as a result of the operation.
      //result.ops array stores inserted Posts. result.ops[0] is the newly inserted post.
      //
        if (result.acknowledged) {  //use result.acknowledged for true/false condition
            res.json(result.insertedId); //res.json(result.ops[0])   ops no longer supported after MongoDB v3.1
          } else {
            console.error("Failed to insert the post into the database:", result);
            res.status(500).json({ error: 'Failed to create the post' });
             }   //test codes to filter undefined result.ops value. 
    } catch (err) {
      console.error("Error inserting post into the database:", err);
      res.status(500).json({ error: 'Failed to create the post' });
    }
  });

  // Route to get all posts
  router.get('/', async (req, res) => {
    try {
      const posts = await postCollection.find().sort({ _id: -1 }).toArray();  
      //from db reference(postCollection), get all documents in collection as find() has no criteria in argument.
      //sort by '_id' with descending order (-1). 1 for ascending order.
      //Cursor - a pointer to the result set of a query. toArray() stores all documents from cursor reference, and store 'values.'
      res.json(posts);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get posts' });
    }
  });

  // Route to update a post by ID
  router.put('/:id', async (req, res) => {
    try {
      const { title, content } = req.body; //Destructures the title and content properties from the request body. 
      const postId = req.params.id; //req.param.id is string value
      const result = await postCollection.updateOne( //updateOne() is an asynchronous MongoDB method used to update a single document in the collection.
        { _id: new ObjectId(postId) },  //filter criteria by '_id' field. Should add 'new' to construct from ObjectId
        { $set: { title, content } } //update operation. The $set operator replaces the value of a field with the specified value.
      );
      if (result.modifiedCount === 0) { //updateOne method returns 1) matchedCount, 2) modifiedCount (= # of modified docs.), 3) upsertedId, 4) acknowledged
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json({ message: 'Post updated successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update the post' });
    }
  });

  // Route to delete a post by ID
  router.delete('/:id', async (req, res) => {
    try {
      const postId = req.params.id;
      const result = await postCollection.deleteOne({ _id: new ObjectId(postId) }); //should add new to construct from ObjectId
      if (result.deletedCount === 0) { //deletedOne method returns 1) deletedCount (= # of deleted docs.), 2) acknowledged 
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json({ message: 'Post deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete the post' });
      console.log(err);
    }
  });

  return router;
  //returns the configured router, which contains all the defined routes and their corresponding route handlers.
};
