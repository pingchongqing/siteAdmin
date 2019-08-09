// import { asyncRouterMap, constantRouterMap } from '@/router'
import { constantRouterMap } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

/**
 * 根据点击的根节点获取当前路由表
 */
function fetchCurrentRouters(data) {
  const { routers, routername } = data
  console.log(routers)
  if(routername || routers.length>0){
    const name = routername || routers[0].name
    const current = routers.find(router => router.name === name) || {}
    return current
  }
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    currentRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_CURRENTROUTES: (state, data) => {
      state.currentRouters = fetchCurrentRouters(data)
    }
  },
  actions: {
    GenerateRoutes({ commit },data) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters
        if (roles.indexOf('service_admin') >= 0) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    },
    GetCurrentRoutes({ commit }, data) {
      return new Promise(resolve => {
        commit('SET_CURRENTROUTES', data)
        resolve()
      })
    }
  }
}

export default permission
