import request from '@/utils/request'

const api = {
  user: '/user',
  role: '/role',
  service: '/service'
}

export default api

export function getUserList (urlParams) {
  return request({
    url: api.user,
    method: 'get',
    params: urlParams
  })
}

export function getRoleList (urlParams) {
  return request({
    url: api.role,
    method: 'get',
    params: urlParams
  })
}

export function getServiceList (urlParams) {
  return request({
    url: api.service,
    method: 'get',
    params: urlParams
  })
}

export function saveService (bodyParams) {
  return request({
    url: api.service,
    method: bodyParams.id === 0 ? 'post' : 'put',
    data: bodyParams
  })
}

export function saveSub (bodyParams) {
  return request({
    url: '/sub',
    method: bodyParams.id === 0 ? 'post' : 'put',
    data: bodyParams
  })
}
