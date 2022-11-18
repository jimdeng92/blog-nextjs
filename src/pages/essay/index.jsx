import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../../components/Layout'
import { getList, getHitokoto } from '../../api'
import ArticleList from '../../components/ArticleList'

export default function Essay ({ posts, hitokoto }) {
  return (
    <Layout hitokoto={hitokoto}>
      <ArticleList posts={posts}/>
    </Layout>
  )
}

Essay.propTypes = {
  posts: PropTypes.object.isRequired,
  hitokoto: PropTypes.object.isRequired
}

export async function getStaticProps () {
  const params = {
    pageSize: 10,
    pageNum: 1,
    keyword: '',
    tabType: 10
  }

  const posts = await getList(params)
  const hitokoto = await getHitokoto()
  return {
    props: { posts, hitokoto },
    revalidate: 1 // 增量再生（更新生成的页面），从后台更新页面
  }
}
