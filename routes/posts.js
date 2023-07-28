// routes/posts.js
const express = require('express');
const router = express.Router();

module.exports = (db) => { //Exporting a function that takes a parameter db, which represents the MongoDB database connection.
  const postCollection = db.collection('posts'); //postCollection stores a reference.
                                                 //Cursor: A pointer to the result set of a query. 

  // Route to create a new post
  router.post('/', async (req, res) => {
    try {
      const { title, content } = req.body; //request ttitle and content data from body
      const newPost = { title, content };  //create post with key title and content
      const result = await postCollection.insertOne(newPost);
      res.json(result.ops[0]);  //res.json() send json response. 
      //result.ops array stores inserted Posts. result.ops[0] is the newly inserted post.
        //    if (result && result.ops && result.ops.length > 0) {
        //    res.json(result.ops[0]);
        //  } else {
        //    res.status(500).json({ error: 'Failed to create the post' });
        //  }    //test codes to filter undefined result.ops value. 
    } catch (err) {
      console.error(err); // Add this line to log the error in the console
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
      const { title, content } = req.body;
      const postId = req.params.id;
      const result = await postCollection.updateOne(
        { _id: ObjectId(postId) },
        { $set: { title, content } }
      );
      if (result.modifiedCount === 0) {
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
      const result = await postCollection.deleteOne({ _id: ObjectId(postId) });
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json({ message: 'Post deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete the post' });
    }
  });

  return router;
  //returns the configured router, which contains all the defined routes and their corresponding route handlers.
};
