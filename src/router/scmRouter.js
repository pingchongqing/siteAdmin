const _import = require('./_import_' + process.env.NODE_ENV)

// /* Layout */
import Layout from '../views/layout/Layout'
import Layoutcategory from '../views/layout/Layoutcategory'
// import { reportCenterUrl } from '@/utils'

export default [  
  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    name: 'user',
    alwaysShow: true,
    meta: { title: '管理员' }, 
    children:[
    {
      path: 'list',
      component: _import('user/list'),
      name: 'userList',
      meta: { title: '管理员列表',noCache: true }
    }
   ]
  },
  {
    path: '/newsInfo',
    component: Layout,
    redirect: '/newsInfo/newsList',
    name: 'newsInfo',
    alwaysShow: true,
    meta: { title: '资讯管理' }, 
    children:[
    {
      path: 'newNews',
      component: _import('newsInfo/newNews'),
      name: 'newNews',
      meta: { title: '新增资讯' }
    },
    {
      path: 'newsList',
      component: _import('newsInfo/newsList'),
      name: 'newsList',
      meta: { title: '资讯列表',noCache: true }
    },
    {
      path: 'newsCategory',
      component: _import('newsInfo/newsCategory'),
      name: 'newsCategory',
      meta: { title: '资讯分类',noCache: true }
    }
   ]
  }
]
