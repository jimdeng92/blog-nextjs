// 文章详情

import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {getList, getDetailById, getHitokoto} from '../../api'
import styles from './index.module.scss'
import ErrorBoundary from '../../components/ErrorBoundary' // 错误边界
import hljs from 'highlight.js'
import Layout from '../../components/Layout'

export async function getStaticProps(context) {
  const {pid} = context.params

  const posts = await getDetailById(pid)
  const hitokoto = await getHitokoto()
  return {
    props: { posts, hitokoto }
  }
}

const Posts = ({posts, hitokoto}) => {
  useEffect(()=>{
    document.querySelectorAll("pre code").forEach(block => {
      try{
        hljs.highlightBlock(block)
      }
      catch(e){
        console.log(e)
      }
    })
  })

  function createMarkup() {
    return {
      __html: posts.html
    }
  }

  return (
    <Layout hitokoto={hitokoto} title={posts.title}>
      <div className={styles.Detail}>
        <h2 className={styles.title}>{posts.title}</h2>
        {
          posts.html && 
          <ErrorBoundary>
            <article className={[`${styles.markdownBody}`, 'markdown-body'].join(' ')} dangerouslySetInnerHTML={createMarkup()}></article>
          </ErrorBoundary>
        }
      </div>
    </Layout>
  )
}

export default Posts

export async function getStaticPaths() {
  const {list} = await getList({
    pageSize: 999,
    pageNum: 1
  })

  const paths = list.map(item => ({
    params: {pid: `${item.id}`}
  }))

  return {
    paths,
    fallback: false // 未返回的任何路径都将产生一个404页面
  }
}

Posts.propTypes = {
  posts: PropTypes.object.isRequired,
  hitokoto: PropTypes.object.isRequired
}
