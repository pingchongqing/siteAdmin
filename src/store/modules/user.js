// import { getUserInfo, userLogout, todoList, purchasContracttodoList, outlink } from '@/api/login'
// import axios from 'axios'
import { authservice } from '@/api/login'
import { setToken, setName, removeToken, removeName } from '@/utils/auth'
// import { reportCenterUrl } from '@/utils'
// const _import = require('@/router/_import_' + process.env.NODE_ENV)
// import Layout from '@/views/layout/Layout'

const user = {
  state: {
    userInfo: '',
    serviceList:[]
  },
  mutations: {
    SET_USERINFO: (state, info) => {
      state.userInfo = info
    },
    SET_SERVICELIST: (state, servicelist) => {
      state.serviceList = servicelist
    },
  },
  actions: {
    // 获取用户信息
    GetInfo({ commit, state },info) {
      commit('SET_USERINFO', info)
      // setToken(info.userType)
      setName(info.username)
    },
    //获取服务列表
    GetServiceList({ commit, state }) {
      return new Promise((resolve, reject) => {
        authservice().then(res=>{
          if(res.data.code=='success'){
            commit('SET_SERVICELIST', res.data.data)
          }
          resolve(res)
        }).catch(err=>{
          console.log(err)
          reject(err)
        })
      })
    },
    // 登出
    LogOut({ commit, state }) {
      commit('SET_USERINFO', '')
      removeToken()
      removeName()
      // console.log(1)
    },
  }
}

export default user
