import request from '@/utils/request'

// 查询Order列表
export function listOrder(query) {
    return request({
        url: '/backend/order/list',
        method: 'get',
        params: query
    })
}

// 查询Order详细
export function getOrder (orderId) {
    return request({
        url: '/backend/order/' + orderId,
        method: 'get'
    })
}


// 新增Order
export function addOrder(data) {
    return request({
        url: '/backend/order',
        method: 'post',
        data: data
    })
}

// 修改Order
export function updateOrder(data) {
    return request({
        url: '/backend/order',
        method: 'put',
        data: data
    })
}

// 删除Order
export function delOrder(orderId) {
    return request({
        url: '/backend/order/' + orderId,
        method: 'delete'
    })
}