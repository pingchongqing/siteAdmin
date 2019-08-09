import Vue from 'vue'
import Router from 'vue-router'
import etpRouter from './etpRouter'
import scmRouter from './scmRouter'
import { mapGetters } from 'vuex'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
import Layoutcategory from '../views/layout/Layoutcategory'
/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  // { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  // { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  // { path: '/404', component: _import('404'), hidden: true },
  // { path: '/401', component: _import('401'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: 'dashboard',
    hidden: true,
    children: [
      {
        name: 'dashboard',
        path: '/dashboard',
        meta: { title: '主页', noCache: true },
        component: _import('dashboard/index')
      },
    ]
  },
  {
    path: '/productInfo',
    component: Layout,
    redirect: '/productInfo/shopproductlist',
    name: 'productInfo',
    alwaysShow: true,
    meta: { title: '商品管理' }, 
    children:[
    {
      path: 'shopproductlist',
      component: _import('productInfo/shopproductlist'),
      name: 'shopproductlist',
      meta: { title: '商品列表',noCache: true }
    },
    {
      path: 'shopproductdetail/:type/:stdProductNo/:lv3CategoryNo',
      component: _import('productInfo/shopproductdetail'),
      name: 'shopproductdetail',
      hidden:true,
      meta: { title: '商品详情',noCache: true }
    }
   ]
  },
  {
      path: '/enquiryQuotationInfo',
      component: Layout,
      redirect: '/enquiryQuotationInfo/enquiryList',
      name: 'enquiryQuotationInfo',
      alwaysShow: true,
      meta: { title: '询报价管理' }, 
      children:[
      {
        path: 'enquiryList',
        component: _import('enquiryQuotationInfo/enquiryList'),
        name: 'enquiryList',
        meta: { title: '询价单',noCache: true }
      },
      {
        path: 'enquirydetail/:orderNo',
        component: _import('enquiryQuotationInfo/enquirydetail'),
        name: 'enquirydetail',
        hidden:true,
        meta: { title: '询价单详情',noCache: true }
      },
      {
        path: 'quotationList',
        component: _import('enquiryQuotationInfo/quotationList'),
        name: 'quotationList',
        meta: { title: '报价单',noCache: true }
      },
      {
        path: 'quotationdetail/:orderNo',
        component: _import('enquiryQuotationInfo/quotationdetail'),
        name: 'quotationdetail',
        hidden:true,
        meta: { title: '报价单详情',noCache: true }
      }
     ]
    },
   {
      path: '/companyInfo',
      component: Layout,
      redirect: '/companyInfo/companyList',
      name: 'companyInfo',
      alwaysShow: true,
      meta: { title: '会员管理' }, 
      children:[
      {
        path: 'companyList',
        component: _import('companyInfo/companyList'),
        name: 'companyList',
        meta: { title: '查询会员',noCache: true }
      },
      {
        path: 'companydetail/:type/:entNo',
        component: _import('companyInfo/companydetail'),
        name: 'companydetail',
        hidden:true,
        meta: { title: '会员详情',noCache: true }
      }
     ]
    },  
  {
      path: '/orderInfo',
      component: Layout,
      redirect: '/orderInfo/orderList',
      name: 'orderInfo',
      alwaysShow: true,
      meta: { title: '订单管理' }, 
      children:[
      {
        path: 'orderList',
        component: _import('orderInfo/orderList'),
        name: 'orderList',
        meta: { title: '订单列表',noCache: true }
      },
      {
        path: 'orderdetail/:id',
        component: _import('orderInfo/orderdetail'),
        name: 'orderdetail',
        hidden:true,
        meta: { title: '订单详情',noCache: true }
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
    },
    {
      path: 'modifyNews/:id',
      component: _import('newsInfo/modifyNews'),
      name: 'modifyNews',
      hidden: true,
      meta: { title: '资讯修改' }
    },
    {
      path: 'newsdetail/:id',
      component: _import('newsInfo/newsdetail'),
      name: 'newsdetail',
      hidden: true,
      meta: { title: '资讯详情' }
    },
   ]
  },
]

export default new Router({
  mode: 'hash', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// export const asyncRouterMap = [
//   ...scmRouter
// ]
