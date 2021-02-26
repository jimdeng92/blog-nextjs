import React from 'react'
import Layout from '../../../components/Layout'
import PropTypes from 'prop-types'
import {getHitokoto, getList} from '../../../api'
import ArticleList from '../../../components/ArticleList'
import Loading from '../../../components/Loading'
import {useRouter} from 'next/router'

export default function Page({posts, hitokoto}) {
  const router = useRouter()
  // 设置 fallback: true 必须进行路由判断，否则打包是无法访问到属性会报错

  return (
    <Layout hitokoto={hitokoto}>
      {router.isFallback ? <Loading /> : <ArticleList posts={posts}/>}
    </Layout>
  )
}

export async function getStaticProps(context) {
  const {num} = context.params
  const params = {
    pageSize: 10,
    pageNum: num,
    keyword: '',
    tabType: 5
  }

  const posts = await getList(params)
  const hitokoto = await getHitokoto()
  return {
    props: { posts, hitokoto },
    revalidate: 1
  }
}

export async function getStaticPaths() {
  const {count} = await getList({
    pageSize: 10,
    pageNum: 1,
    keyword: '',
    tabType: 5
  })

  // 总页数
  const totalPage = count ? Math.ceil(count / 10) : 0

  const pages = [...Array(totalPage).keys()].map(item => ({
    params: {num: (item + 1).toString()} // 参数 value 必须是字符串
  }))

  return {
    paths: pages,
    fallback: true // 未返回的任何路径都将产生一个404页面
  }
}


Page.propTypes = {
  posts: PropTypes.object.isRequired,
  hitokoto: PropTypes.object.isRequired
}
