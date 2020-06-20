import request from '@/utils/request'

// 查询SpecialContent列表
export function listSpecialContent(query) {
    return request({
        url: '/backend/specialcontent/list',
        method: 'get',
        params: query
    })
}

// 查询SpecialContent详细
export function getSpecialContent (specialId) {
    return request({
        url: '/backend/specialcontent/info/' + specialId,
        method: 'get'
    })
}


// 新增SpecialContent
export function addSpecialContent(data) {
    return request({
        url: '/backend/specialcontent',
        method: 'post',
        data: data
    })
}

// 修改SpecialContent
export function updateSpecialContent(data) {
    return request({
        url: '/backend/specialcontent',
        method: 'put',
        data: data
    })
}
// 删除SpecialContent
export function delSpecialContent(specialId) {
    return request({
        url: '/backend/specialcontent/del/' + specialId,
        method: 'delete'
    })
}
