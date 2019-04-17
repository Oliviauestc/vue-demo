import http from '@/utils/http'

export function getPreAppsDisplay (saId) {
  return http({
    url: '/api/folderList',
    method: 'get'
  })
}
