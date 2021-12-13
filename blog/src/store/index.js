// import { reject } from 'core-js/fn/promise'
import { createStore } from 'vuex'
import getters  from './getters'
import mutations from './mutations'

// 相当于暴露一个 store 实例 const store = createStore({
export default createStore({
  state: {
    // login 是用来决定登录状态的
    loginStatus: false,
    showLogin: false,
    userInfo: null,
    tags: [
      {tag:'前端',tagItems: ['json','jquery','html','css','javascript','typescript','h5','es6','css3','ajax','vue','react','angular']},
      {tag:'后端',tagItems: ['java','C#','C++','C语言','python','php','node.js','django','golang']},
      {tag:'运维',tagItems: ['docker','nginx','linux','负载均衡','ssh']},
      {tag:'测试',tagItems: ['postman','单元测试','压力测试','集成测试']},
      {tag:'网络',tagItems: ['http','https','ssl','websocket','tcp/ip','udp']},
      {tag:'计算机基础',tagItems:['操作系统','网络协议','数据结构与算法']},
      {tag:'数据库',tagItems: ['mongodb','mongoose','mysql','navicat']}
    ],
  },
  mutations,
  actions: {
    // 使用action 而不是直接commit 改变 state
    change_showLogin(context, payload) {
      return new Promise((resolve, reject) => {
        context.commit("change_showLogin", payload)
        // resolve 内参数将传到 then
        resolve()
      })
    },
    change_login (context, payload) {
      return new Promise((resolve,reject) => {
        context.commit('change_Login', payload)
        // 返回的是commit 完成后的 login， 与 async / await 效果相同, resolve 传递数据用res获取
        resolve(this.state.login)
      })
    },
    change_userInfo (context, payload) {
      return new Promise((resolve,reject) => {
        context.commit('change_userInfo', payload)
        // 返回的是commit 完成后的 login， 与 async / await 效果相同
        resolve()
      })
    },
    // 修改用户的编辑器暂存
    change_userInfoTemp (context, payload) {
      return new Promise((resolve,reject) => {
        context.commit('change_userInfoTemp', payload)
        resolve()
      })
    }
  },
  modules: {
  },
  getters
})
