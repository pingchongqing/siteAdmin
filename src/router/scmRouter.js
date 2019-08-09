const _import = require('./_import_' + process.env.NODE_ENV)

// /* Layout */
import Layout from '../views/layout/Layout'
import Layoutcategory from '../views/layout/Layoutcategory'
// import { reportCenterUrl } from '@/utils'

export default [
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
