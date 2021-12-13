import request from '@/utils/request'

export function publishRequest(data) {
    return request({
        url: '/rest/article/publish',
        method: 'post',
        data
    })
}

export function uploadImg(data) {
    return request({
        url: '/rest/article/upload',
        method: 'post',
        data
    })
}

export function articleRequest(data) {
    return request({
        url: `/rest/article/page/${data}`,
        method: 'get',
    })
}

export function detailsRequest(data) {
    return request({
        url: `/rest/article/details/${data}`,
        method: 'get',
    })
}

export function getComment(id) {
    return request({
        url: `/rest/article/comment/${id}`,
        method: 'get'
    })

}

export function subComment(data,id) {
    return request({
        url: `/rest/article/comment/${id}`,
        method: 'put',
        data
    })
}

export function subReply(data,id) {
    return request({
        url: `/rest/article/reply/${id}`,
        method: 'put',
        data
    })
}


export function updateDraft(data,id){
    return request({
        url: `/rest/article/updateDraft/${id}`,
        method: 'put',
        data
    })
}

