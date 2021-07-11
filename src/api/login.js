import request from '@/utils/request'

/**
 * 定义URL变量
 */
const userApi = {
  Login: '/auth/login',
  Logout: '/auth/logout',
  UserInfo: '/user/info'
}

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
    url: '/oauth/login',
    method: 'post',
    data: parameter,
    needToken: false,
    jumpLoginPageWhen401: false
  })
}

export function getInfo () {
  return request({
    url: userApi.UserInfo,
    method: 'get'
  })
}

export function logout () {
  return request({
    url: userApi.Logout,
    method: 'post'
  })
}
