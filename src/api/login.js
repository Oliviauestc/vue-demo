import http from '@/utils/http'

export function getPreAppsDisplay (id) {
  return http({
    url: '/api/folderList',
    method: 'get'
  })
}
export function getValidate (time) {
  return http({
    url: '/api/code',
    method: 'get'
  })
}
export function login (params) {
  console.log(params)
  return http({
    url: '/api/login',
    data: params,
    method: 'post'
  })
}
