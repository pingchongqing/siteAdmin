import router from './router'
import store from './store'
import { MessageBox } from 'element-ui'
import { LoginPath } from '@/utils'
import { getName } from '@/utils/auth'

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  if (whiteList.includes(to.path)) {
    next()
  } else {
    let username=getName()
    if (username) {
      next()
    } else {
      router.push({ path: '/login' }) 
    }
   }
})

// router.afterEach(() => {
//   NProgress.done() // 结束Progress
// })
