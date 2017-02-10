/**
 * Created by rancongjie@126.com on 17/1/21.
 */
import * as types from '../mutation-types'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import locale from 'element-ui/lib/locale'
import Vue from 'vue'
const state = {
  lang: ""
};

const getters = {
  getLang: state => state.lang
};

const actions = {
  changeLang({commit},lang){
    commit(types.CHANGE_LANG,lang)

  },
  initLang({commit}){
    commit(types.INIT_LANG)
  }
};

const mutations = {
  [types.INIT_LANG](state){
    remote_ip_info && remote_ip_info.country == "中国" ? state.lang = "zh-CN" : state.lang = "en-US";
    localStorage.setItem("LANG", state.lang);

  },
  [types.CHANGE_LANG](state, lang){
    state.lang = lang;
    if(lang == "en-US"){
      locale.use(enLocale);
    }else if (lang == "zh-CN") {
      locale.use(zhLocale);
    }
    localStorage.setItem("LANG", lang);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
