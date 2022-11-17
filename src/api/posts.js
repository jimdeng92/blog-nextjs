import request from '../utils/request'

// 博客列表
export const getList = async (data) => {
  return await request.post('/api/blog/list', data)
}

// 添加博客
export const createBlog = async (data) => {
  return await request.post('/api/blog/create', data)
}

// 获取博客详情
export const getBlogDetailById = async (id) => {
  return await request.get('/api/blog/detail?id=' + id)
}

// 更新博客
export const updateBlog = async (data) => {
  return await request.post('/api/blog/update', data)
}

// 删除博客
export const deleteBlog = async (data) => {
  return await request.post('/api/blog/delete', data)
}
