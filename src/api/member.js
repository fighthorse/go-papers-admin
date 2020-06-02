import request from '@/utils/request'

// 查询Member列表
export function listMember(query) {
    return request({
        url: '/backend/member/list',
        method: 'get',
        params: query
    })
}

// 查询Member详细
export function getMember (memberId) {
    return request({
        url: '/backend/member/info/' + memberId,
        method: 'get'
    })
}


// 新增Member
export function addMember(data) {
    return request({
        url: '/backend/member',
        method: 'post',
        data: data
    })
}

// 修改Member
export function updateMember(data) {
    return request({
        url: '/backend/member',
        method: 'put',
        data: data
    })
}

// 删除Member
export function delMember(memberId) {
    return request({
        url: '/backend/member/del/' + memberId,
        method: 'delete'
    })
}
