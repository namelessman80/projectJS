const axios = require('axios');
//import axios from 'axios';
//Vue lacks a built-in HTTP library, so Axios library is recommended to keep interaction with REST API. 

// Replace 'http://localhost:3000' with the URL of your Express server
const baseURL = 'http://localhost:3000';

// Function to create a new post (POST)    /*export with named exports method*/
export const createPost = async (title, content) => {
  try {
    const response = await axios.post(`${baseURL}/posts`, { title, content });
    return response.data;
  } catch (error) {
    console.error('Request failed:', error.message);
    throw error;
  }
};

// Function to get all posts (GET)
export const getAllPosts = async () => {
  try {
    const response = await axios.get(`${baseURL}/posts`);
    return response.data;
  } catch (error) {
    console.error('Request failed:', error.message);
    throw error;
  }
};

// Function to update a post by ID (PUT)
export const updatePost = async (_id, title, content) => {
  try {
    const response = await axios.put(`${baseURL}/posts/${_id}`, { title, content });
    return response.data;
  } catch (error) {
    console.error('Request failed:', error.message);
    throw error;
  }
};

// Function to delete a post by ID (DELETE)
export const deletePost = async (_id) => {
  try {
    const response = await axios.delete(`${baseURL}/posts/${_id}`);
    return response.data;
  } catch (error) {
    console.error('Request failed:', error.message);
    throw error;
  }
};

/*
// Example usage:    
(async () => {
  try {
    // Create a new post
    const newPost = await createPost('New Post', 'This is the content of the new post');
    console.log('New post created:', newPost);

    // Get all posts
    const allPosts = await getAllPosts();
    console.log('All posts:', allPosts);

    // Update a post
    const postIdToUpdate = allPosts[0]._id; // Assuming there's at least one post in the database
    const updatedPost = await updatePost(postIdToUpdate, 'Updated Post', 'This is the updated content');
    console.log('Updated post:', updatedPost);

    // Delete a post
    console.log(updatedPost._id);               //temp line for debug
    const postIdToDelete = updatedPost._id;
    await deletePost(postIdToDelete);           //debug
    console.log('Post deleted successfully');   
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
*/
//export default getAllPosts;  //debug example with default export. 