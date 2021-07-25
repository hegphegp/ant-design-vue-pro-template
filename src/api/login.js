import request from '@/utils/request'

/**
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
  return request({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    url: '/oauth/login',
    method: 'post',
    data: parameter,
    needToken: false,
    jumpLoginPageWhen401: false
  })
}

export function getInfo () {
  return request({
    baseURL: process.env.VUE_APP_API_BASE_URL01,
    url: '/user/info',
    method: 'get'
  })
}

export function logout () {
  return request({
    baseURL: process.env.VUE_APP_API_BASE_URL02,
    url: '/auth/logout',
    method: 'post'
  })
}
