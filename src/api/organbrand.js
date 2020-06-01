import request from '@/utils/request'

// 查询OrganBrand列表
export function listOrganBrand(query) {
    return request({
        url: '/backend/organbrand/list',
        method: 'get',
        params: query
    })
}

// 查询OrganBrand详细
export function getOrganBrand (brandId) {
    return request({
        url: '/backend/organbrand/info/' + brandId,
        method: 'get'
    })
}


// 新增OrganBrand
export function addOrganBrand(data) {
    return request({
        url: '/backend/organbrand',
        method: 'post',
        data: data
    })
}

// 修改OrganBrand
export function updateOrganBrand(data) {
    return request({
        url: '/backend/organbrand',
        method: 'put',
        data: data
    })
}

// 删除OrganBrand
export function delOrganBrand(brandId) {
    return request({
        url: '/backend/organbrand/del/' + brandId,
        method: 'delete'
    })
}
