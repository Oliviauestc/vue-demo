import { Message } from 'element-ui'
import axios from 'axios'
// 创建axios实例
const http = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 16000 // 请求超时时间
})
// 添加请求拦截器
http.interceptors.request.use(config => {
  console.log('config', config)
  config.headers['Access-Token'] = localStorage.getItem('LG_TK')
  return config
}, error => {
  return Promise.reject(error)
})
// 添加响应拦截器
http.interceptors.response.use(response => {
  let details = response.data.details
  let code = response.data.returnCode
  let message = response.data.returnMsg
  if (code === 1) {
    return details
  } else {
    Message({
      showClose: true,
      message: message,
      type: 'error',
      duration: 4000
    })
    return Promise.reject('error')
  }
}, error => {
  const res = error.response.data
  let errorMessage = res.message
  if (res.status === 404) {
    errorMessage = '访问接口不存在!'
  } else if (res.status === 403) {
    errorMessage = '无权限访问!'
  } else if (res.status === 405) {
    errorMessage = '访问方法不被允许!'
  } else if (res.status === 504) {
    errorMessage = '访问超时，请重试！'
  } else {
    errorMessage = '内部服务器错误！'
  }
  Message({
    showClose: true,
    message: errorMessage,
    type: 'error',
    duration: 4000
  })
  return Promise.reject(error)
})
export default http
