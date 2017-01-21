/**
 * Created by rancongjie@126.com 17/1/18.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import language from './module/language'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    language
  },
  strict:true
});


export default store