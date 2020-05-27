import request from '@/utils/request'

// 查询FeedBack列表
export function listFeedBack(query) {
    return request({
        url: '/backend/feedback/list',
        method: 'get',
        params: query
    })
}

// 查询FeedBack详细
export function getFeedBack(id) {
    return request({
        url: '/backend/feedback/info/' + id,
        method: 'get'
    })
}


// 新增FeedBack
export function addFeedBack(data) {
    return request({
        url: '/backend/feedback',
        method: 'post',
        data: data
    })
}

// 修改FeedBack
export function updateFeedBack(data) {
    return request({
        url: '/backend/feedback',
        method: 'put',
        data: data
    })
}

// 删除FeedBack
export function delFeedBack(id) {
    return request({
        url: '/backend/feedback/' + id,
        method: 'delete'
    })
}