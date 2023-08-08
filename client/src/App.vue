<template>
  <nav>
    <router-link to="/">Home</router-link> |  <!-- vue router manages this at index.js-->
    <router-link to="/about">About</router-link> |
    <router-link to="/crud">CRUD</router-link>
  </nav>
  <router-view/>
</template>

<style>   
#app { 
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  border-bottom: 1px solid #ddd;
  display: inline-block;
  padding-bottom: 10px;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
