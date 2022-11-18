import React from 'react'
import Layout from '../../components/Layout'
import PropTypes from 'prop-types'
import { getHitokoto, getList } from '../../api'
import ArticleList from '../../components/ArticleList'

export default function Home ({ posts, hitokoto }) {
  return (
    <Layout hitokoto={hitokoto}>
      <ArticleList posts={posts}/>
    </Layout>
  )
}

export async function getStaticProps () {
  const params = {
    pageSize: 10,
    pageNum: 1,
    keyword: ''
  }

  const posts = await getList(params)
  const hitokoto = await getHitokoto()
  return {
    props: { posts, hitokoto },
    revalidate: 1 // 增量再生（更新生成的页面），从后台更新页面
  }
}

Home.propTypes = {
  posts: PropTypes.object.isRequired,
  hitokoto: PropTypes.object.isRequired
}
