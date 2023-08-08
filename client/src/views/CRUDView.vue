<template>
  <div class="CRUD">
    <h1>{{ title }}</h1> <br>
    <!-- <h1>{{ posts }}</h1> <br> -->
    <input type="text" v-model="newPost.title" placeholder="Post Title">
    <input type="text" v-model="newPost.content" placeholder="Post Content">
    <button @click="_createPost">Create Post</button> <br>
  
    <div v-for="post in posts" :key="post._id">
      <h3>{{ post.title }} </h3>
      <p>{{ post.content }}</p>
      <input type="text" v-model="post.title" placeholder="post.title">
      <input type="text" v-model="post.content" placeholder="post.content">
      <button @click="_updatePost(post._id, post)">Update Post</button>
      <button @click="_deletePost(post._id)">Delete Post</button>
    </div>

  </div>
</template>

<script>
import { createPost, getAllPosts, updatePost, deletePost } from '/src/AxiosClient.js';
//import getAllPosts from '/src/AxiosClient.js'; //debug - importing variable from default export method
export default {
  name: 'CRUDView',
  //components: {
    //HelloWorld
    //ModalComp
  //},
  data(){
    return {
      title: 'CRUD Board',
      posts: [],
      newPost: {
        title: '',
        content: '',
      },
      postToUpdate: {
        title: '',
        content: '',
      },
    };
  },
  async mounted() {
    await this._getAllPosts()
  },
    //Safari browser may produce unexpected Web Socket error. You can go to Develop -> Experimental Features -> NSURLSession Websocket to turn it off, and the tilt UI will work OK.
   //template Ref. allows to store a ref. to a DOM element inside a variable (replace query selector in JS)
  methods: {
    async _getAllPosts() {
      try {
        this.posts = await getAllPosts();
        console.log('got all posts')  //console for debug
      } catch (error) {
        console.error('Error fetching posts: ', error.message);
      } 
    }, 
    async _createPost() {
      try {
        const { title, content } = this.newPost;
        await createPost(title, content);
        this.newPost.title = '';
        this.newPost.content = '';
        await this._getAllPosts();
      } catch (error) {
        console.error('Error creating post:', error.message);
      }
    },
    async _updatePost(id, post) {
      try {
        /*
        const postToUpdate = this.posts.find((post) => post._id === id);
        //Need to update title/content info from user input
        //console.log(id);
        //console.log(postToUpdate);
        //const postToUpdate = true;
        //const condition = postToUpdate && postToUpdate._id;
        if (postToUpdate) {
          const updatedPost = await updatePost(id, this.postToUpdate.title, this.postToUpdate.content);
          //const updatedPost = await updatePost(id, 'Updated Post', 'This is the updated content');
          console.log('Updated post:', updatedPost);
          await this._getAllPosts();
        }
        */
        const updatedPost = await updatePost(id, post.title, post.content);
        console.log('Updated post:', updatedPost);
        await this._getAllPosts();

      } catch (error) {
        console.error('Error updating post:', error.message);
      }
    },
    async _deletePost(id) {
      try {
        await deletePost(id);
        await this._getAllPosts();
      } catch (error) {
        console.error('Error deleting post:', error.message);
      }
    },
    //handleClick() {
      //console.log(this.$refs.name)
      //this.$refs.name.classList.add('active')
      //this.$refs.name.focus()
    //}
  }
}
</script>


