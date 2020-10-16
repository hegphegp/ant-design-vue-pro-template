import request from '@/utils/request'

const userApi = {
  Login: '/aa/auth/login00000000000',
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
  console.log('export function login (parameter) {')
  return request({
    url: userApi.Login,
    method: 'post',
    data: parameter,
    redirectParam: false
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
