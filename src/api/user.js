import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/backend/login',
    method: 'post',
    data
  })
}

export function refreshtoken(data) {
  return request({
    url: '/backend/refreshtoken',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/backend/getinfo',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/backend/logout',
    method: 'post'
  })
}

