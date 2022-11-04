
// import Qs from 'qs'
/*global process*/

// 访问线上接口
// export const baseUrl = 'https://imlinhe.com'

export const baseUrl = process.env.NEXT_PUBLIC_HOST

console.log('baseUrl---', baseUrl)

const request = async (url, conf) => {
  const config = conf || {}

  let contentType, promise
  if (config['Content-Type'] !== undefined) {
    contentType = config['Content-Type']
  } else if (config.method === 'POST' || config.method === 'GET' || !config.method) {
    contentType = 'application/json;charset=UTF-8'
  } else {
    contentType = 'application/x-www-form-urlencoded; charset=UTF-8'
  }

  // const reqUrl = (baseUrl + url).replace('//', '/')
  const reqUrl = baseUrl + url
  const headers = {
    // 如果实例配置没传token过来的话，直接使用保存在sessionStorage的token
    // 这里假设后端直接读头文件的token字段，我直接用token当字段了，Authorization也同理
    // token: config.token === undefined ? sessionStorage.token : config.token,
    'Content-Type': contentType,
  }

  if (!config.method || config.method === 'GET') {
    promise = await fetch(reqUrl, {
      headers,
      // https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch#%E5%8F%91%E9%80%81%E5%B8%A6%E5%87%AD%E6%8D%AE%E7%9A%84%E8%AF%B7%E6%B1%82
      // 为了让浏览器发送包含凭据的请求（即使是跨域源），要将 credentials: 'include' 添加到传递给 fetch() 方法的 init 对象。
      credentials: 'include'
    })
  } else if (config.method === 'POST') {
    promise = await fetch(reqUrl, {
      body: JSON.stringify(config.body),
      headers,
      method: 'POST',
      credentials: 'include'
    })
  } else {
    promise = await fetch(reqUrl, {
      body: JSON.stringify(config.body),
      headers,
      method: config.method,
      credentials: 'include'
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
