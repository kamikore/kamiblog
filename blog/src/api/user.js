//获取 axios 实例
import request from '@/utils/request'

// 暴露出api接口

export function verifyToken(data) {
  return request({
    url: '/verify',
    method: 'post',
    data
  })
}

export function getUser(data) {
  return request({
    url: `/rest/user/info/${data}`,
    method: 'get',
  })

}


export function loginRequest(data) {
    return request({
      url: '/login',
      method: 'post',
      data
    })
  }

export function registerRequest(data) {
  return request({
    url: '/register',
    method: 'post',
    data
  })
}


export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}


export function updateEditTemp(data,id) {
  return request({
      url: `/rest/user/updateTemp/${id}`,
      method: 'put',
      data
  })
}

