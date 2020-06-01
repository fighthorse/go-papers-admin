import request from '@/utils/request'

// 查询Organ列表
export function listOrgan(query) {
    return request({
        url: '/backend/organ/list',
        method: 'get',
        params: query
    })
}

// 查询Organ详细
export function getOrgan (organId) {
    return request({
        url: '/backend/organ/' + organId,
        method: 'get'
    })
}


// 新增Organ
export function addOrgan(data) {
    return request({
        url: '/backend/organ',
        method: 'post',
        data: data
    })
}

// 修改Organ
export function updateOrgan(data) {
    return request({
        url: '/backend/organ',
        method: 'put',
        data: data
    })
}

// 删除Organ
export function delOrgan(organId) {
    return request({
        url: '/backend/organ/' + organId,
        method: 'delete'
    })
}
