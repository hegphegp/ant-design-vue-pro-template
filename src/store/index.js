import Vue from 'vue'
import Vuex from 'vuex'
import storage from 'store'
import { login, getInfo, logout } from '@/api/login'
import { welcome } from '@/utils/util'
import { asyncRouterMap as routerConfig } from '@/config/router.config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: '',
    welcome: '',
    avatar: '',
    routers: [],
    info: {}
  },
  mutations: {
    setRouters: (state, routers) => {
      state.routers = routers
    },
    setNickname: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    setAvatar: (state, avatar) => {
      state.avatar = avatar
    }
  },
  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const result = response.result
          storage.set('Access-Token', result.token, 7 * 24 * 60 * 60 * 1000)
          resolve(result)
        }).catch(error => {
          console.error('%c ' + error, 'font-weight:bold; font-size:13px;')
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const result = response.result
          commit('setNickname', { name: result.name, welcome: welcome() })
          commit('setAvatar', result.avatar)
          resolve(response)
        }).catch(error => {
          console.error('%c ' + error, 'font-weight:bold; font-size:13px;')
          reject(error)
        })
      })
    },

    AddRouters ({ commit }) {
      return new Promise((resolve) => {
        commit('setRouters', routerConfig)
        resolve()
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          resolve()
        }).catch((error) => {
          console.error('%c ' + error, 'font-weight:bold; font-size:13px;')
          resolve(error)
        }).finally(() => {
          storage.remove('Access-Token')
        })
      })
    }
  },
  getters: {
    avatar: state => state.avatar,
    nickname: state => state.name,
    welcome: state => state.welcome,
    userInfo: state => state.info,
    routers: state => state.routers
  }
})
