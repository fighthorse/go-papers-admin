import request from '@/utils/request'

// 查询OrderStudent列表
export function listOrderStudent(query) {
    return request({
        url: '/backend/orderstudent/list',
        method: 'get',
        params: query
    })
}

// 查询OrderStudent详细
export function getOrderStudent (orderStudentId) {
    return request({
        url: '/backend/orderstudent/' + orderStudentId,
        method: 'get'
    })
}


// 新增OrderStudent
export function addOrderStudent(data) {
    return request({
        url: '/backend/orderstudent',
        method: 'post',
        data: data
    })
}

// 修改OrderStudent
export function updateOrderStudent(data) {
    return request({
        url: '/backend/orderstudent',
        method: 'put',
        data: data
    })
}

// 删除OrderStudent
export function delOrderStudent(orderStudentId) {
    return request({
        url: '/backend/orderstudent/' + orderStudentId,
        method: 'delete'
    })
}
