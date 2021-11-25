import request from '@/utils/request'

export function personalArticle(query) {
  return request({
    url: '/admin/api/rest/article/personalArticle',
    method: 'get',
    params: query,
  })
}

export function manageArticle(query) {
  return request({
    url: '/admin/api/rest/article/manage',
    method: 'get',
    params: query
  })
}

export function getArticle(query) {
  return request({
    url: `/admin/api/rest/article/detail`,
    method: 'get',
    params: query
  })
}

export function deleteArticle(query) {
  return request({
    url: '/admin/api/rest/article',
    method: 'delete',
    //
    params: query
  })
}

export function updateArticle(id,data) {
  return request({
    url: `/admin/api/rest/article/${id}`,
    method: 'put',
    data
  })
}
