import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'


const state = {
  token: getToken(),
  userInfo: ''
  
}

// 提交修改
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ROLES: (state, roles) => {
    state.userInfo= roles
  },
  SET_USERINFO: (state, data) => {
    state.userInfo = data
  },
  SET_AVATAR: (state,data) => {
    console.log('更改',data)
    state.userInfo.avatar = data;
  }
}

const actions = {
  // user login, 只从state 拿出 commit
  login({ commit }, userInfo) {
    const { email, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ email: email.trim(), password: password }).then(response => {
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
      getInfo().then(response => {
        const { data }  = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        // roles must be a non-empty array
        // if (!roles || roles.length <= 0) {
        //   reject('getInfo: roles must be a non-null array!')
        // }

        commit('SET_USERINFO', data)

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  uploadAvatar({ commit, state },data) {
    commit('SET_AVATAR', data)
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken() // must remove  token  first
        resetRouter()
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
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  }
}

export default {
  // 采用命名空间，调用也需要路径调用
  namespaced: true,
  state,
  mutations,
  actions
}

