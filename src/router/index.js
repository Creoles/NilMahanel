/**
 * Created by rancongjie@126.com 17/1/18.
 */
import VueRoute from "vue-router"
import Vue from 'vue'
import ex from "../views/components/ex.vue"
Vue.use(VueRoute);
export default new VueRoute({
  routes:[
    {path:'/admin',component:ex}
  ]
});

