import request from '../utils/fetch'

export const getList = async (params) => {
  const {data} = await request('/api/blog/list', {
    method: 'POST',
    body: params
  })
  return data
}

export const getDetailById = async (id) => {
  const {data} = await request(`/api/blog/detail?id=${id}`)
  return data
}

export const getHitokoto = async () => {
  // const data = fetch('https://v1.hitokoto.cn')
  //   .then(res => res.json())
  //   .then(data => data)
  //   .catch(console.error)
  // return data
  const res = await fetch('https://v1.hitokoto.cn?c=h&encode=text')
  const hitokoto = await res.text() // 使用默认 json 打包会导致错误
  return {
    hitokoto
  }
}
