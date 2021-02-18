import React from 'react'
import Layout from '../../../components/Layout'
import PropTypes from 'prop-types'
import {getHitokoto, getList} from '../../../api'
import ArticleList from '../../../components/ArticleList'

export default function Page({posts, hitokoto}) {
  return (
    <Layout hitokoto={hitokoto}>
      <ArticleList posts={posts}/>
    </Layout>
  )
}

export async function getStaticProps(context) {
  console.log(context)
  const {num} = context.params
  const params = {
    pageSize: 10,
    pageNum: num,
    keyword: ''
  }

  const posts = await getList(params)
  const hitokoto = await getHitokoto()
  return {
    props: { posts, hitokoto }
  }
}

export async function getStaticPaths() {
  const {count} = await getList({
    pageSize: 10,
    pageNum: 1,
    keyword: ''
  })

  // 总页数
  const totalPage = count ? Math.ceil(count / 10) : 0

  const pages = [...Array(totalPage).keys()].map(item => ({
    params: {num: (item + 1).toString()} // 参数 value 必须是字符串
  }))

  return {
    paths: pages,
    fallback: false // 未返回的任何路径都将产生一个404页面
  }
}


Page.propTypes = {
  posts: PropTypes.object.isRequired,
  hitokoto: PropTypes.object.isRequired
}