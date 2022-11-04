import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {getList, getDetailById, getHitokoto} from '../../api'
import styles from './index.module.scss'
import ErrorBoundary from '../../components/ErrorBoundary' // 错误边界
import Layout from '../../components/Layout'
import Loading from '../../components/Loading'
import {useRouter} from 'next/router'
import { updateBlog, getBlogDetailById } from '../../api/posts'
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Modify = ({posts, hitokoto}) => {
  const router = useRouter()
  const pid = router.query.pid
  // 设置 fallback: true 必须进行路由判断，否则打包是无法访问到属性会报错
  // TODO Layout 传参优化
  if (router.isFallback) {
    return <Loading />
  }

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [articleType, setArticleType] = useState(5)


  // 如果路由中有id 就获取初始数据（编辑）
  useEffect(() => {
    if (pid) {
      getArticleDetail(pid)
    }
  }, [pid])

  // 获取文章信息
  const getArticleDetail = async (id) => {
    try {
      const resData = await getBlogDetailById(id)
      if (resData.code === 200) {
        setTitle(resData.data.title)
        setContent(resData.data.content)
        setArticleType(resData.data.tabType)
      }
    } catch(e) {
      console.error(e)
    }
  }

  // 修改标题
  const handleSetTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleContentChange = (e) => {
    setContent(e.target.value)
  }

  // 确认修改
  const handleConfirm = async () => {
    if (!title) {
      toast.warn('标题不能为空')
      return
    }
    if (!content) {
      toast.warn('内容不能为空')
      return
    }
    if (!articleType) {
      toast.warn('类型不能为空')
      return
    }

    try {
      let resData = await updateBlog({id: pid, title, content, tabType: articleType})
      if (resData.code !== 200) throw resData

      toast.success('更新成功！')
      router.push('/posts/' + pid)
    } catch(e) {
      console.log(e)
      toast.error(e.message)
    }
  }


  return (
    <Layout hitokoto={hitokoto} title={posts.title} digest={posts.digest}>
      {
        router.isFallback ?
        <Loading /> :
        <div className={styles.Modify}>
          <input type="text" value={title} className={styles.title} onChange={handleSetTitle} />
          {
            // posts.html &&
            <ErrorBoundary>
              <textarea className={styles.textarea} value={content} rows={20} onChange={handleContentChange} />
              <div className={styles.actionBlock}>
                <a className={styles.confirmButton} onClick={handleConfirm}>确认修改</a>
                <a className={styles.cancelButton}>取消</a>
              </div>
            </ErrorBoundary>
          }
          <ToastContainer transition={Flip} />
        </div>
      }

    </Layout>
  )
}

export default Modify

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

Modify.propTypes = {
  posts: PropTypes.object.isRequired,
  hitokoto: PropTypes.object.isRequired
}
