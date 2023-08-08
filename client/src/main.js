import { createApp } from 'vue'  //createApp directly from vue in node_modules
import App from './App.vue'
import router from './router'    //added when install vue router

createApp(App).use(router).mount('#app')
//mount App object from App.vue file (Root Component) to app, which we import in html (DOM component) 
//.use(router) added when install/use vue router
//router object exported from index.js    i.e. main.js links index.js (routing) and mounts App.vue object
