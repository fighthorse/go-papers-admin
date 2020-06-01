import request from '@/utils/request'

// 查询OrderPay列表
export function listOrderPay(query) {
    return request({
        url: '/backend/orderpay/list',
        method: 'get',
        params: query
    })
}

// 查询OrderPay详细
export function getOrderPay(orderPayId) {
    return request({
        url: '/backend/orderpay/' + orderPayId,
        method: 'get'
    })
}


// 新增OrderPay
export function addOrderPay(data) {
    return request({
        url: '/backend/orderpay',
        method: 'post',
        data: data
    })
}

// 修改OrderPay
export function updateOrderPay(data) {
    return request({
        url: '/backend/orderpay',
        method: 'put',
        data: data
    })
}

// 删除OrderPay
export function delOrderPay(orderPayId) {
    return request({
        url: '/backend/orderpay/' + orderPayId,
        method: 'delete'
    })
}