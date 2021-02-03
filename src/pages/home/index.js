import React from 'react'
import Layout from '../../components/Layout'
import PropTypes from 'prop-types'
import {getHitokoto, getList} from '../../api'
import ArticleList from '../../components/ArticleList'

// This function gets called at build time
export async function getStaticProps() {
  const params = {
    pageSize: 10,
    pageNum: 1,
    keyword: ''
  }

  const posts = await getList(params)
  const hitokoto = await getHitokoto()
  return { 
    props: { posts, hitokoto } 
  }
}

Home.propTypes = {
  posts: PropTypes.object.isRequired,
  hitokoto: PropTypes.object.isRequired
}

export default function Home({posts, hitokoto}) {
  return (
    <Layout hitokoto={hitokoto}>
      <ArticleList posts={posts}/>
    </Layout>
  )
}
