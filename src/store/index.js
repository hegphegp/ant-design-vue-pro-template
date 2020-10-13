import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters: {
    isMobile: state => state.app.isMobile,
    lang: state => state.app.lang,
    theme: state => state.app.theme,
    color: state => state.app.color,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    nickname: state => state.user.name,
    welcome: state => state.user.welcome,
    userInfo: state => state.user.info,
    routers: state => state.user.routers
  }
})
