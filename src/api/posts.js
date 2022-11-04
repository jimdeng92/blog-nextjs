import request from '../utils/fetch'

// 博客列表
export const getList = async (data) => {
  return await request('/api/blog/list', {
    method: 'POST',
    body: data
  })
}

// 添加博客
export const createBlog = async (data) => {
  return await request('/api/blog/create', {
    method: 'POST',
    body: data
  })
}

// 获取博客详情
export const getBlogDetailById = async (id) => {
  return await request('/api/blog/detail?id=' + id)
}

// 更新博客
export const updateBlog = async (data) => {
  return await request('/api/blog/update', {
    method: 'POST',
    body: data
  })
}

// 删除博客
export const deleteBlog = async (data) => {
  return await request('/api/blog/delete', {
    method: 'POST',
    body: data
  })
}
