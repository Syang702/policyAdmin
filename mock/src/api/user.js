import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'admin/login/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'admin/index/index',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: 'admin/login/loginOut',
    method: 'post'
  })
}

export function countData() {
  return request({
    url: 'admin/Pet/index',
    method: 'get'
  })
}
