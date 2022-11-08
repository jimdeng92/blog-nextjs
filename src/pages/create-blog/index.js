import React, {useState} from 'react';
import styles from './index.module.scss'
import { createBlog } from '../../api/posts'
import { useRouter } from 'next/router'
import { ToastContainer, toast, Flip } from 'react-toastify';
import Wrapper from '../../components/Wrapper';
import Footer from '../../components/Footer';

const CreateBlog = () => {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [articleType, setArticleType] = useState(5)

  // 修改标题
  const handleSetTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleContentChange = (e) => {
    setContent(e.target.value)
  }

  const handleSelectChange = (e) => {
    setArticleType(e.target.value)
  }

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
      let resData = await createBlog({title, content, tabType: articleType})
      if (resData.code !== 200) throw resData

      toast.success('提交成功！')
      router.replace('/home')
    } catch(e) {
      toast.error(e.message)
    }
  }

  const handleCancel = () => {
    router.back()
  }


  return (
    <>
      <Wrapper>
        <div className={styles.Create}>
          <p className={styles.createTitle}>{'Jim\'s Space 新建文章'}</p>
          <div className={styles.selection}>
            <input type="text" value={title} className={styles.title} onChange={handleSetTitle} placeholder="请输入标题" />
            <select placeholder="请选择文章类型" value={articleType} onChange={handleSelectChange} className={styles.articleType}>
              <option value={5}>技术</option>
              <option value={10}>生活</option>
            </select>
          </div>
          <textarea className={styles.textarea} value={content} onChange={handleContentChange} placeholder="请输入内容..." />
          <div className={styles.actionBlock}>
            <a className={styles.confirmButton} onClick={handleConfirm}>确认提交</a>
            <a className={styles.cancelButton} onClick={handleCancel}>取消</a>
          </div>
          <ToastContainer transition={Flip} />
        </div>
      </Wrapper>
      <Footer />
    </>
  )
}

export default CreateBlog;
