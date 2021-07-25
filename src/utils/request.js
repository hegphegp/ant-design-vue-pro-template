import axios from 'axios'
import store from '@/store'
import storage from 'store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'

axios.defaults.withCredentials = true
// 创建 axios 实例
const request = axios.create({
  // API 请求默认的baseURL，若外面有传baseURL参数会覆盖这个参数
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 6000, // 请求超时时间
  // needToken: true, // 在这里定义变量是没用的，调用方不传这个变量进来，就不会有这个变量，即使这里写了，也是没有这个变量的，在request.interceptors.request.use定义才有用
  // showApiResponseErr: true, // 在这里定义变量是没用的，调用方不传这个变量进来，就不会有这个变量，即使这里写了，也是没有这个变量的
  // jumpLoginPageWhen401: true, // http为401时，默认跳转到登录页面重新登录
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// request interceptor
request.interceptors.request.use(config => {
  const token = storage.get('Access-Token')
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  config.needToken = (config.needToken === undefined) ? true : config.needToken
  config.showApiResponseErr = (config.showApiResponseErr === undefined) ? true : config.showApiResponseErr
  config.jumpLoginPageWhen401 = (config.jumpLoginPageWhen401 === undefined) ? true : config.jumpLoginPageWhen401
  if (config.needToken === true) {
    if (token) {
      config.headers['Access-Token'] = token
    } else {
      store.dispatch('Logout').then(() => {
        window.location.reload()
      })
    }
  }
  return config
})

// response interceptor
request.interceptors.response.use(
  response => {
    /**
    const url = response.config.url
    const method = response.config.method
    const params = response.config.params
    console.log(method + ' ' + url + ' ' + JSON.stringify(params) + ' ' + JSON.stringify(response.data))
    */
    // http状态码为200会进入这里
    if (response.data.code === 200) {
      return response.data
    } else {
      // 响应体的code编码不是200
      if (response.config.showApiResponseErr === true) {
        try {
          notification.error({
            message: response.data.msg,
            description: response.data.msg
          })
        } catch (err) {
          console.error('%c ' + err, 'font-weight:bold; font-size:13px;')
        }
      }
      return Promise.reject(response.data)
    }
  },
  error => {
    if (error.response) {
      const data = error.response.data
      if (error.response.status === 403) {
        notification.error({
          message: 'Forbidden',
          description: data.message
        })
      } else if (error.response.status === 401) {
        notification.error({
          message: '请先登录',
          description: '请先登录'
        })
        // error.config.jumpLoginPageWhen401 为true时，才重定向
        if (error.config.jumpLoginPageWhen401 !== null && error.config.jumpLoginPageWhen401 === true) {
          // 从 localstorage 获取 token
          const token = storage.get('Access-Token')
          if (token) {
            store.dispatch('Logout').then(() => {
              setTimeout(() => {
                window.location.reload()
              }, 1500)
            })
          }
        }
      } else {
        // 直接弹窗显示后端返回的异常信息
        if (error.config.showApiResponseErr === true) {
          notification.error({
            message: data.msg,
            description: data.msg
          })
        }
      }
      console.error('%c ' + error, 'font-weight:bold; font-size:13px;')
    }
    return Promise.reject(error)
  }
)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export {
  installer as VueAxios,
  request as axios
}
