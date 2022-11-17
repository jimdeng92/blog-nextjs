import axios from 'axios'
import qs from 'qs'

const pendingRequest = new Map()

// 生成 key
function generateReqKey(config) {
  const { method, url, params, data } = config
  return [method, url, qs.stringify(params), qs.stringify(data)].join("&")
}

// 用于把当前请求信息添加到pendingRequest对象中
function addPendingRequest(config) {
  const requestKey = generateReqKey(config)
  config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
    if (!pendingRequest.has(requestKey)) {
       pendingRequest.set(requestKey, cancel)
    }
  })
}

// 检查是否存在重复请求，若存在则取消已发的请求
function removePendingRequest(config) {
  const requestKey = generateReqKey(config)
  if (pendingRequest.has(requestKey)) {
     const cancelToken = pendingRequest.get(requestKey)
     cancelToken(requestKey)
     pendingRequest.delete(requestKey)
  }
}

const baseURL = process.env.NEXT_PUBLIC_HOST

const service = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 15 * 1000,
})

// request 拦截器
service.interceptors.request.use(
  config => {
    removePendingRequest(config)
    addPendingRequest(config)
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)
// respone 拦截器
service.interceptors.response.use(
  response => {
    removePendingRequest(response.config)
    const res = response.data
    // if (res.code && res.code !== 200) {
      // console.error('responseError: ' + qs.stringify(res))
      // Toast(res.message)
    //   return Promise.reject(res || 'error')
    // } else {
      return Promise.resolve(res)
    // }
  },
  error => {
    removePendingRequest(error.config || {})
    if (axios.isCancel(error)) {
      console.log("已取消的重复请求：" + error.message)
    } else {
      // 添加异常处理
    }
    console.log('err' + error)
    return Promise.reject(error)
  }
)
export default service
