const _import = require('@/router/_import_' + process.env.NODE_ENV)

/* Layout */
import Layout from '@/views/layout/Layout'
import Layoutcategory from '@/views/layout/Layoutcategory'

const getters = {
  sidebar: state => state.app.sidebar,
  userInfo: state => state.user.userInfo,
  serviceList: state => state.user.serviceList,
}
export default getters
