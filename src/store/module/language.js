/**
 * Created by rancongjie@126.com on 17/1/21.
 */
import * as types from '../mutation-types'


const state = {
  lang: ""
};

const getters = {
  getLang: state => state.lang
};

const actions = {
  changeLang({commit}){
    commit(types.CHANGE_LANG,{lang})

  },
  initLang({commit}){
    commit(types.INIT_LANG)
  }
};

const mutations = {
  [types.INIT_LANG](state){
    remote_ip_info && remote_ip_info.country == "中国" ? state.lang = "zh-CN" : state.lang = "en-US";
  },
  [types.CHANGE_LANG](state, {lang}){
    state.lang = lang
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
