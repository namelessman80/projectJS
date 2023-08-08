<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <h1>{{ title }}</h1>
    <!-- <ModalComp /> -->
    <input type="text" ref="name">
    <button @click="handleClick">click me</button>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
//import ModalComp from '@/components/ModalComp.vue' //component should have multi-words

export default {
  name: 'HomeView',
  components: {
    //HelloWorld
    //ModalComp
  },
  data(){
    return {
      title: 'MyFirst Vue App :)'
    }
  },
   //template Ref. allows to store a ref. to a DOM element inside a variable (replace query selector in JS)
  methods: {
    handleClick() {
      console.log(this.$refs.name)
      this.$refs.name.classList.add('active')
      this.$refs.name.focus()
    }
  }
}
</script>
