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
Vue.use(ElementUI, {
    enLocale,
    zhLocale
});
Vue.config.lang = 'en';
Vue.locale('zh-cn', zhLocale);
Vue.locale('en', enLocale);
Vue.prototype.$locale = {
    change(lang) {
        Vue.config.lang = lang;
    }
};
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
});

Vue.filter('room', function(arr, option) {
    let sum = 0;
    arr.forEach(item => {
        sum += item.used;
    });
    if (option) {
        return Math.floor(sum / option * 100);
    } else {
        return sum
    }
});
var apiBase = axios.create({
    baseURL: 'https://api.example.com'
});
Vue.prototype.$http = apiBase;


new Vue({
    el: '#app',
    router,
    store,
    ...App
});