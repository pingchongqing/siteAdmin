import Cookies from 'js-cookie'
// import { getGys, StroeList } from '@/api/planorder'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    storeList: [],
    gysData: []
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    SET_STORELIST: (state, data) => {
      state.storeList = data
    },
    SET_GYSLIST: (state, data) => {
      state.gysData = data
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    }
  }
}

export default app
