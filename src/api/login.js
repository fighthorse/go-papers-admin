import request from '@/utils/request'

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/backend/getCaptcha',
    method: 'get'
  })
}
