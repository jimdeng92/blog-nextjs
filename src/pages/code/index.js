import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../../components/Layout'
import ArticleList from '../../components/ArticleList'
import { getList, getHitokoto } from '../../api'

// This function gets called at build time
export async function getStaticProps() {
  const params = {
    pageSize: 10,
    pageNum: 1,
    keyword: '', 
    tabType: 5
  }

  const posts = await getList(params)
  const hitokoto = await getHitokoto()
  return { props: { posts, hitokoto } }
}

Code.propTypes = {
  posts: PropTypes.object.isRequired,
  hitokoto: PropTypes.object.isRequired
}

export default function Code({posts, hitokoto}) {
  return (
    <Layout hitokoto={hitokoto}>
      <ArticleList posts={posts}/>
    </Layout>
  )
}
