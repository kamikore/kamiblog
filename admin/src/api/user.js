import request from '@/utils/request'


// 发送的请求都会被axios 拦截器先验证

export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  // 这里与直接使用axios实例是同样的，因为暴露的就是axios 实例
  return request({
    // url: '/vue-admin-template/user/info',
    url: '/admin/info',
    method: 'get',
    params: { token }
  })
}

export function updateInfo(data) {
  return request({
    url: '/admin/api/rest/user/update',
    method: 'put',
    data
  })
}


export function uploadAvatar(data) {
  return request({
    url: '/admin/api/rest/user/upload',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}

export function manageUser(query) {
  return request({
    url: '/admin/api/rest/user/manage',
    method: 'get',
    params:query
  })
}

