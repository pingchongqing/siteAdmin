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
    url: '/zh/api/auth/logout',
    method: 'post',
  })
}

//获取拥有的服务列表
export function authservice() {
  return request({
    url: '/zh/api/auth/getCurrentService',
    method: 'get',
  })
}

//切换服务
export function changenewservice(data) {
  return request({
    url: '/zh/api/auth/switchService',
    method: 'get',
    params: data
  })
}

//修改密码
export function modifypass(oldpass,newpass) {
  return request({
    url: '/zh/api/auth/changePwd?oldPwd='+oldpass+'&newPwd='+newpass,
    method: 'post',
  })
}