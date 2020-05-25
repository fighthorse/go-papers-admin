import request from '@/utils/request'

// 查询操作日志列表
export function list(query) {
  return request({
    url: '/backend/operloglist',
    method: 'get',
    params: query
  })
}

// 删除操作日志
export function delOperlog(operId) {
  return request({
    url: '/backend/operlog/' + operId,
    method: 'delete'
  })
}

// 清空操作日志
export function cleanOperlog() {
  return request({
    url: '/backend/operlog/clean',
    method: 'delete'
  })
}

// 导出操作日志
export function exportOperlog(query) {
  return request({
    url: '/backend/operlog/export',
    method: 'get',
    params: query
  })
}
