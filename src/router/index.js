/**
 * Created by rancongjie@126.com 17/1/18.
 */
import Vue from 'vue'
import VueRoute from "vue-router"
import User from '../views/account/index.vue'
import Home from '../views/admin/Home.vue'
Vue.use(VueRoute);

function generateRoutes() {

}
export default new VueRoute({
  //todo mode:"history"

  routes: [
    {
      name: 'user',
      path: '/login',
      component: User
    },
    {
      name:'home',
      path:'/admin',
      component:Home
    },
    // ...generateRoutes(),
    {
      path: '*',
      redirect: '/admin'
    }
  ]
});



