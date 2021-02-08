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

export const getHitokoto = () => {
  return fetch('https://v1.hitokoto.cn')
    .then((res) => {
      return res.json()
    })
  // const res = await fetch('https://v1.hitokoto.cn/')
  // return await res.json()
}
