import request from '@/utils/request'

// 查询Course列表
export function listCourse(query) {
    return request({
        url: '/backend/course/list',
        method: 'get',
        params: query
    })
}

// 查询Course详细
export function getCourse (courseId) {
    return request({
        url: '/backend/course/info/' + courseId,
        method: 'get'
    })
}


// 新增Course
export function addCourse(data) {
    return request({
        url: '/backend/course',
        method: 'post',
        data: data
    })
}

// 修改Course
export function updateCourse(data) {
    return request({
        url: '/backend/course',
        method: 'put',
        data: data
    })
}

// 删除Course
export function delCourse(courseId) {
    return request({
        url: '/backend/course/' + courseId,
        method: 'delete'
    })
}