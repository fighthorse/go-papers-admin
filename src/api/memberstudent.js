import request from '@/utils/request'

// 查询MemberStudent列表
export function listMemberStudent(query) {
    return request({
        url: '/backend/memberstudent/list',
        method: 'get',
        params: query
    })
}

// 查询MemberStudent详细
export function getMemberStudent (studentId) {
    return request({
        url: '/backend/memberstudent/info/' + studentId,
        method: 'get'
    })
}


// 新增MemberStudent
export function addMemberStudent(data) {
    return request({
        url: '/backend/memberstudent',
        method: 'post',
        data: data
    })
}

// 修改MemberStudent
export function updateMemberStudent(data) {
    return request({
        url: '/backend/memberstudent',
        method: 'put',
        data: data
    })
}

// 删除MemberStudent
export function delMemberStudent(studentId) {
    return request({
        url: '/backend/memberstudent/del/' + studentId,
        method: 'delete'
    })
}
