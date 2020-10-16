import axios from 'axios'
import store from '@/store'
import storage from 'store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 6000, // 请求超时时间
  redirectParam: true,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// 异常拦截处理器
const errorHandler = (error) => {
  console.log(error.config.redirectParam)
  debugger
  if (error.response) {
    const data = error.response.data
    // 从 localstorage 获取 token
    const token = storage.get('Access-Token')
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      // error.config.redirectParam 为true时，才重定向
      if (error.config.redirectParam !== null && error.config.redirectParam !== undefined && error.config.redirectParam === true) {
        if (token) {
          store.dispatch('Logout').then(() => {
            setTimeout(() => {
              window.location.reload()
            }, 1500)
          })
        }
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
  const token = storage.get('Access-Token')
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers['Access-Token'] = token
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  /**
  const url = response.config.url
  const method = response.config.method
  const params = response.config.params
  console.log(method + ' ' + url + ' ' + JSON.stringify(params) + ' ' + JSON.stringify(response.data))
   */
  return response.data
}, errorHandler)

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
