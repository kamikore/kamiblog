// 相当于store 内的计算属性, 接受 state 作为其第一个参数,state.todos
const getters = {
  // sidebar: state => state.app.sidebar,
  // device: state => state.app.device,
  // token: state => state.user.token,
  // avatar: state => state.user.avatar,
  // name: state => state.user.name,
  // roles: state => state.user.roles,
  // permission_routes: state => state.permission.routes
  userInfo: state => state.userInfo,
  loginStatus: state => state.loginStatus,
  tags: state => state.tags
  
}
export default getters
