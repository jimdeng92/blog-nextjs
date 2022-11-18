import request from '../utils/request'

// 登录
export const login = async (data) => {
  return request.post('/api/user/login', data)
}

// 修改密码
export const modifPassword = async (data) => {
  return await request.post('/api/user/modifPassword', data)
}
