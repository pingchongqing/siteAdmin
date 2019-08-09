import request from '@/utils/request'

// 获取询价单列表
export function enquiryInfoList(data) {
  return request({
    url: '/api/enquiryOrder/getEnquiryOrdersByPage',
    method: 'post',
    data: data
  })
}

// 询价单详情
export function enquiryInfoDetail(data) {
  return request({
    url: '/api/enquiryOrder/getEnquiryOrderByOrderNo',
    method: 'get',
    params:data
  })
}

// 获取报价单列表
export function quotationInfoList(data) {
  return request({
    url: '/api/quotationOrder/getEnquiryOrdersByPage',
    method: 'post',
    data: data
  })
}

// 报价单详情
export function quotationInfoDetail(data) {
  return request({
    url: '/api/quotationOrder/getEnquiryOrderByOrderNo',
    method: 'get',
    params:data
  })
}