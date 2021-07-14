import Vue from 'vue'
import Vuex from 'vuex'
import storage from 'store'
import { login } from '@/api/login'
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
    Login ({ commit }, bodyParams) {
      return new Promise((resolve, reject) => {
        // const data = {
        //   'id': 'A3EDBA02-5EE7-aE35-178e-d28c3a9CAeD2',
        //   'username': 'admin',
        //   'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
        //   'lang': 'zh-CN',
        //   'token': '4291d7da9005377ec9aec4a71ea837f'
        // }
        // storage.set('Access-Token', data.token, 7 * 24 * 60 * 60 * 1000)
        // resolve(data)
        login(bodyParams).then(response => {
          console.log('login(userInfo).then(response => ' + JSON.stringify(response))
          storage.set('Access-Token', response.data, 7 * 24 * 60 * 60 * 1000)
          resolve(response)
        }).catch(error => {
          console.error('%c ' + error, 'font-weight:bold; font-size:13px;')
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        console.log('GetInfo ({ commit, state })')
        const result = {
          'id': '4291d7da9005377ec9aec4a71ea837f',
          'name': '天野远子',
          'username': 'admin',
          'avatar': '/avatar2.jpg',
          'createTime': 1497160610259,
          'role': {
            'id': 'admin',
            'name': '管理员',
            'describe': '拥有所有权限',
            'status': 1,
            'creatorId': 'system',
            'createTime': 1497160610259,
            'deleted': 0,
            'permissions': [{
              'roleId': 'admin',
              'permissionId': 'dashboard',
              'permissionName': '仪表盘',
              'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
              'actionEntitySet': [{
                'action': 'add',
                'describe': '新增',
                'defaultCheck': false
              }, {
                'action': 'query',
                'describe': '查询',
                'defaultCheck': false
              }, {
                'action': 'get',
                'describe': '详情',
                'defaultCheck': false
              }, {
                'action': 'update',
                'describe': '修改',
                'defaultCheck': false
              }, {
                'action': 'delete',
                'describe': '删除',
                'defaultCheck': false
              }],
              'actionList': null,
              'dataAccess': null
            }]
          }
        }
        commit('setNickname', { name: result.name, welcome: welcome() })
        commit('setAvatar', result.avatar)
        resolve(result)
        /**
        getInfo().then(response => {
          const result = response.result
          console.log('GetInfo ({ commit }) {')
          console.log(JSON.stringify(result))
          commit('setNickname', { name: result.name, welcome: welcome() })
          commit('setAvatar', result.avatar)
          resolve(response)
        }).catch(error => {
          console.error('%c ' + error, 'font-weight:bold; font-size:13px;')
          reject(error)
        })
         */
      })
    },

    AddRouters ({ commit, state }) {
      return new Promise((resolve) => {
        commit('setRouters', routerConfig)
        resolve()
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        resolve()
        storage.remove('Access-Token')
        /**
        logout(state.token).then(() => {
          resolve()
        }).catch((error) => {
          console.error('%c ' + error, 'font-weight:bold; font-size:13px;')
          resolve(error)
        }).finally(() => {
          storage.remove('Access-Token')
        })
         */
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
