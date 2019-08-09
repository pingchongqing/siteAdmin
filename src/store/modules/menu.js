import { getMenu } from '@/api/menu'

const menu = {
  state: {
    menu: []
  },

  mutations: {
    SET_MENU: (state, menu) => {
      state.menu = menu
    }
  },

  actions: {
    // 登录
    GetMenu({ commit }) {
      return new Promise((resolve, reject) => {
        getMenu().then(response => {
          const data = response.data
          commit('SET_MENU', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default menu
