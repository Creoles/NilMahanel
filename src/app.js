/**
 * Created by rancongjie@126.com 17/1/18.
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueI18n from 'vue-i18n'
import store from './store'
import * as filters from './filters'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n);
Vue.use(ElementUI,{enLocale,zhLocale});
Vue.config.lang = 'en';
Vue.locale('zh-cn', zhLocale);
Vue.locale('en', enLocale);
Vue.prototype.$locale =  {
  change(lang){
    Vue.config.lang = lang;
  }
};
Vue.prototype.$http = axios;

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