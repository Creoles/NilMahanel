/**
 * Created by rancongjie@126.com 17/1/18.
 */
import Vue from 'vue'
import Resource from 'vue-resource'
import App from './App.vue'
import router from './router'
import VeeValidate from 'vee-validate';
import store from './store'
import * as filters from './filters'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI);
Vue.use(Resource);
Vue.use(VeeValidate);

// Object.keys(filters).forEach(key => {
//   Vue.filter(key, filters[key])
// });
// const { state } = store;
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});