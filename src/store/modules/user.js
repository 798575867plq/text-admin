import { apis } from '@/api'
import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
  token: getToken(),
  userInfo: {},
  permissions: [], //菜单权限
  // 面包屑
  breadcrumb: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USER: (state, userInfo) => {
    state.userInfo = userInfo;
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions;
  },
  SET_BREADCRUMB: (state, breadcrumb) => {
    state.breadcrumb = breadcrumb;
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    console.log(apis)
    return new Promise((resolve, reject) => {
      apis.common.goLogin(userInfo).then(response => {
        console.log(response.token)
        commit('SET_TOKEN', response.token)
        setToken(response.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      apis.common.getInfo().then(response => {
        console.log(response, "用户信息")
        //操作权限
        if (response.menuList && response.menuList.length > 0) {
          // 验证返回的roles是否是一个非空数组
          commit("SET_PERMISSIONS", response.menuList);
        } else {
          reject("用户无权限!");
        }
        commit("SET_USER", response.userInfo);
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      apis.common.loginOut({ token: state.token }).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },

  getBreadcrumbList({ commit }, data) {
    return new Promise(resolve => {
      commit('SET_BREADCRUMB', data)
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
