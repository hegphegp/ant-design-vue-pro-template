import request from '@/utils/request'

const api = {
  user: '/user',
  service: '/service'
}

export function getUserList (urlParams) {
  return request({
    url: api.user,
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
