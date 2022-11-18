import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import styles from './index.module.scss'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

const ArticleCard = (props) => {
  return (
    <div className={styles.Article}>
      <header>
        <Link href={'/posts/[pid]'} as={`/posts/${props.article.id}`}>
          <h2>{props.article.title}</h2>
        </Link>
      </header>
      <main className={styles.textCut}>{props.article.digest}...</main>
      <footer>
        <span>{dayjs().from(props.article.createdAt, true)}前发布</span>
        {/* <span>248 条评论</span>
        <span>186 人喜欢</span> */}
      </footer>
    </div>
  )
}

ArticleCard.propTypes = {
  article: PropTypes.object.isRequired
}

export default ArticleCard
