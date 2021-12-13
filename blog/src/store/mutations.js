const mutations = {
    change_userInfo: (state, payload) =>{
        state.userInfo = payload
    },
    // 用于切换登录框 / 注册框
    change_showLogin: (state, payload) =>{
        /*login和register只能有一个显示  所以只能一个true*/
        state.showLogin = payload
    },
    change_Login: (state, payload) =>{
        state.loginStatus = payload
    },
    change_userInfoTemp: (state, payload)=>{
        state.userInfo.editTemp = payload
    }
}

export default mutations;