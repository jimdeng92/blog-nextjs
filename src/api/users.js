import request from '../utils/fetch'

 // 登录
 export const login = async (data) => {
  return request('/api/user/login', {
    method: 'POST',
    body: data,
  })
 }

 // 修改密码
 export const modifPassword = async (data) => {
  return await request('/api/user/modifPassword', {
    method: 'POST',
    body: data,
  })
 }
