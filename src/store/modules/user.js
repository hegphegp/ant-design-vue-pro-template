import storage from 'store'
import { login, getInfo, logout } from '@/api/login'
import { welcome } from '@/utils/util'
import { asyncRouterMap as routerConfig } from '@/config/router.config'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    routers: [],
    info: {}
  },

  mutations: {
    setToken: (state, token) => {
      state.token = token
    },
    setRouters: (state, routers) => {
      state.routers = routers
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
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
          commit('setToken', result.token)
          resolve()
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
          commit('SET_NAME', { name: result.name, welcome: welcome() })
          commit('SET_AVATAR', result.avatar)
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
          commit('setToken', null)
          storage.remove('Access-Token')
        })
      })
    }
  }
}

export default user
