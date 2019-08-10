import request from '@/utils/request'

//登录
export function userlogin(data) {
  return request({
    url: '/api/auth/login',
    method: 'get',
    params: data
  })
}

//退出
export function authlogout() {
  return request({
    url: '/api/auth/logout',
    method: 'post',
  })
}

// 用户列表
export function authlist() {
  return request({
    url: '/api/auth/list',
    method: 'get',
  })
}

// 新增用户
export function adduser(data) {
  return request({
    url: '/api/auth/add',
    method: 'post',
    data
  })
}
// 删除用户
export function deleteuser(data) {
  return request({
    url: '/api/auth/del',
    method: 'post',
    data
  })
}
// 重置密码
export function resetpassword(data) {
  return request({
    url: '/api/auth/resetpassword',
    method: 'post',
    data
  })
}

//修改密码
export function updatepassword(data) {
  return request({
    url: '/api/auth/updatepassword',
    method: 'post',
    data
  })
}