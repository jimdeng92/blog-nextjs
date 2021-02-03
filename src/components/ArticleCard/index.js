import React from 'react'
import Link from 'next/link'
import styles from './index.module.scss'
import {splitStr} from '../../utils/common'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

const Article = (props) => {
  return (
    <div className={styles.Article}>
      <header>
        <Link href={`/posts/[pid]`} as={`/posts/${props.article.id}`}>
          <a><h2>{props.article.title}</h2></a>
        </Link>
      </header>
      <main>{splitStr(props.article.content, 100)}</main>
      <footer>
        <span>{dayjs().from(props.article.createdAt, true)}前发布</span>
        {/* <span>248 条评论</span>
        <span>186 人喜欢</span> */}
      </footer>
    </div>
  )
}

export default Article
