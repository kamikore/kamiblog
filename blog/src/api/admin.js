import request from '@/utils/request'

export function adminRequest(data) {
    return request({
        url: '/admin',
        method: 'get',
        data
    })
}