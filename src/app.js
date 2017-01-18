/**
 * Created by rancongjie@126.com 17/1/18.
 */
import Vue from 'vue'
import Resource from 'vue-resource'
import App from './App.vue'
import router from './router'
import store from './store'
import * as filters from './filters'

Vue.use(Resource);

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});
const { state } = store;
const app = new Vue({
  router,
  store,
  ...App
});
export { app, router, store }