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
    url: '/oauth/login',
    method: 'post',
    data: parameter,
    needToken: false,
    jumpLoginPageWhen401: false
  })
}

export function getInfo () {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function logout () {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}
