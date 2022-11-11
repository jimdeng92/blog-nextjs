import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {getList, getDetailById, getHitokoto} from '../../api'
import styles from './index.module.scss'
import ErrorBoundary from '../../components/ErrorBoundary' // 错误边界
import hljs from 'highlight.js'
import Layout from '../../components/Layout'
import Loading from '../../components/Loading'
import {useRouter} from 'next/router'
import Link from 'next/link'
import { marked } from 'marked'
import 'highlight.js/styles/atom-one-dark.css'
import Icon from '../../components/Icon'

const Posts = ({posts, hitokoto}) => {
  const router = useRouter()
  // 设置 fallback: true 必须进行路由判断，否则打包是无法访问到属性会报错
  // TODO Layout 传参优化
  if (router.isFallback) {
    return <Loading />
  }

  // document.addEventListener('DOMContentLoaded', () => {
  //   const markdownBody = document.querySelector(".markdown-body")
  //   hljs.highlightElement(markdownBody)
  // });
  useEffect(()=>{
    // hljs.highlightAll()
    document.querySelectorAll('pre code').forEach((el) => {
      hljs.highlightElement(el);
    });
  })

  function createMarkup() {
    console.log()
    return {
      __html: marked.parse(posts.content)
    }
  }

  return (
    <Layout hitokoto={hitokoto} title={posts.title} digest={posts.digest}>
      {
        router.isFallback ?
        <Loading /> :
        <div className={styles.Detail}>
          <ErrorBoundary>
            <div id="posts" className="posts-expand">
              <article className={[`${styles.markdownBody}`, 'post'].join(' ')} >
                <div className={styles.titleWrapper}>
                  <h1 className={['post-title', 'post-header', styles.title].join(' ')}>{posts.title}</h1>
                  <Link href={`/modify-blog/[pid]`} as={`/modify-blog/${posts.id}`} className={styles.modifyButton}>
                    <Icon name="Edit" />
                    {/* <Icon name="Trash2" /> */}
                  </Link>
                </div>
                <div className="post-body" dangerouslySetInnerHTML={createMarkup()}></div>
              </article>
            </div>
          </ErrorBoundary>
        </div>
      }
    </Layout>
  )
}

export default Posts

export async function getStaticProps(context) {
  const {pid} = context.params

  const posts = await getDetailById(pid)
  const hitokoto = await getHitokoto()
  return {
    props: { posts, hitokoto },
    revalidate: 1
  }
}

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
    fallback: true // 未返回的任何路径都将产生一个404页面
  }
}

Posts.propTypes = {
  posts: PropTypes.object.isRequired,
  hitokoto: PropTypes.object.isRequired
}
