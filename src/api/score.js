import request from '@/utils/request'

export function getInfo(params) {
  return request({
    url: '/score/info',
    method: 'get',
    params
  })
}
