
import Qs from 'qs'

export const baseUrl = process.env.HOST

const request = async (url, config) => {
  let contentType, promise
  if (config['Content-Type'] !== undefined) {
    contentType = config['Content-Type']
  } else if (config.method === 'POST') {
    contentType = 'application/json;charset=UTF-8'
  } else {
    contentType = 'application/x-www-form-urlencoded; charset=UTF-8'
  }

  // const reqUrl = (baseUrl + url).replace('//', '/')
  const reqUrl = (baseUrl + url)
  console.log(reqUrl)
  const headers = {
    // 如果实例配置没传token过来的话，直接使用保存在sessionStorage的token
    // 这里假设后端直接读头文件的token字段，我直接用token当字段了，Authorization也同理
    // token: config.token === undefined ? sessionStorage.token : config.token,
    'Content-Type': contentType
  }

  if (!config.method || config.method === 'GET') {
    promise = await fetch(reqUrl, {
      headers
    })
  } else if (config.method === 'POST') {
    promise = await fetch(reqUrl, {
      body: JSON.stringify(config.body),
      headers,
      method: 'POST'
    })
  } else {
    promise = await fetch(reqUrl, {
      body: JSON.stringify(config.body),
      headers,
      method: config.method
    })
  }
  
  return await handleRes(promise)
}

// 处理响应数据
const handleRes = async (res) => {
  const parsedRes = await parseRes(res)
  // 如果res.ok，则请求成功
  if (res.ok) {
    return parsedRes
  }
  // 请求失败，返回解析之后的失败的数据
  const error = parsedRes
  // ! 控制台抛出错误
  throw error 
}

const parseRes = async (res) => {
  const contentType = res.headers.get('Content-Type')
  // 判定返回的内容类型，做不同的处理
  if (contentType) {
    if (contentType.indexOf('json') > -1) {
      return await res.json()
    }
    if (contentType.indexOf('text') > -1) {
      return await res.text()
    }
    if (contentType.indexOf('form') > -1) {
      return await res.formData()
    }
    if (contentType.indexOf('video') > -1) {
      return await res.blob()
    }
  }

  return await res.text()
}

export default request
