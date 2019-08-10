import request from '@/utils/request'

// 资讯分类列表
export function newsCategoryInfo(data) {
  return request({
    url: '/api/artcls/list',
    method: 'get',
    params: data
  })
}

// 资讯分类新增
export function createCategoryName(data) {
  return request({
    url: '/api/artcls/create',
    method: 'post',
    data: data
  })
}

// 资讯分类修改
export function modifyCategoryName(data) {
  return request({
    url: '/api/artcls/modify',
    method: 'post',
    data: data
  })
}

//删除资讯分类
export function deleteCategoryName(data) {
  return request({
    url: '/api/artcls/del',
    method: 'delete',
    data
  })
}

//资讯列表
export function newsInfo(data) {
  return request({
    url: '/api/article/search',
    method: 'post',
    data
  })
}

//资讯新增
export function createNews(data) {
  return request({
    url: '/api/article/create',
    method: 'post',
    data:data
  })
}

//资讯修改
export function modifyNewsInfo(data) {
  return request({
    url: '/api/information/updateInformation',
    method: 'post',
    data:data
  })
}

//资讯删除
export function deleteNewsInfo(data) {
  return request({
    url: '/api/article/del',
    method: 'delete',
    data
  })
}

//获取资讯详情
export function newsInfodetail(data) {
  return request({
    url: '/api/article/detail',
    method: 'get',
    params: data
  })
}

//是否显示
export function changeNewsState(data) {
  return request({
    url: '/api/information/updateIsShow',
    method: 'post',
    data:data
  })
}