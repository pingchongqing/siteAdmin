import request from '@/utils/request'

// 会员列表
export function companyInfoList(data) {
  return request({
    url: '/api/ecpUser/queryListPage',
    method: 'get',
    params: data
  })
}

// 会员详情
export function userInfoDetail(data) {
  return request({
    url: '/api/ecpUser/userDetail/'+data,
    method: 'get'
  })
}

//企业详情
export function companyInfoDetail(data) {
  return request({
    url: '/api/enterprise/enterpriseDetail',
    method: 'post',
    data:data
  })
}

//会员审核
export function companyInfoCheck(data) {
  return request({
    url: '/api/enterprise/checkEnterprise',
    method: 'post',
    data:data
  })
}