// 相当于store 内的计算属性, 接受 state 作为其第一个参数,state.todos
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  permission_routes: state => state.permission.routes,
  tags: state => state.article.tags
}
export default getters
