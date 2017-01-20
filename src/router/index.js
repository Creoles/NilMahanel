/**
 * Created by rancongjie@126.com 17/1/18.
 */
import Vue from 'vue'
import VueRoute from "vue-router"
import Sign from '../views/account/sign.vue'
import Home from '../views/admin/Home.vue'
Vue.use(VueRoute);

function generateRoutes() {

}
export default new VueRoute({
  //todo mode:"history"

  routes: [
    {
      name: 'sign',
      path: '/sign',
      component: Sign
    },
    {
      name:'home',
      path:'/admin',
      component:Home
    },
    // ...generateRoutes(),
  ]
});



