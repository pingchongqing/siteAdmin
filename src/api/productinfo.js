import request from '@/utils/request'

// 商品列表
export function productInfoList(data) {
  return request({
    url: '/api/product/queryListPage',
    method: 'get',
    params: data
  })
}

// 查询spu所属sku
export function skuDetail(data) {
  return request({
    url: '/api/product/skuProductListBySpuNo/'+data,
    method: 'get'
  })
}

//根据spu查询商品详情
export function productInfodetail(data) {
  return request({
    url: '/api/product/spuProductDetail/'+data,
    method: 'get'
  })
}

//审核商品
export function checksku(data) {
  return request({
    url: '/api/product/checkProduct',
    method: 'post',
    data:data
  })
}