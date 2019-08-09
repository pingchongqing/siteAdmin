import request from '@/utils/request'

// 订单列表
export function orderInfoList(data) {
  return request({
    url: '/api/customerOrder/queryListPage',
    method: 'get',
    params: data
  })
}

// 订单详情
export function orderInfoDetail(data) {
  return request({
    url: '/api/customerOrder/orderDetail/'+data,
    method: 'get'
  })
}