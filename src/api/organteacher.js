import request from '@/utils/request'

// 查询OrganTeacher列表
export function listOrganTeacher(query) {
    return request({
        url: '/backend/organteacher/list',
        method: 'get',
        params: query
    })
}

// 查询OrganTeacher详细
export function getOrganTeacher (teacherId) {
    return request({
        url: '/backend/organteacher/info/' + teacherId,
        method: 'get'
    })
}


// 新增OrganTeacher
export function addOrganTeacher(data) {
    return request({
        url: '/backend/organteacher',
        method: 'post',
        data: data
    })
}

// 修改OrganTeacher
export function updateOrganTeacher(data) {
    return request({
        url: '/backend/organteacher',
        method: 'put',
        data: data
    })
}

// 删除OrganTeacher
export function delOrganTeacher(teacherId) {
    return request({
        url: '/backend/organteacher/del/' + teacherId,
        method: 'delete'
    })
}