import React from 'react'
import PropTypes from 'prop-types'
import ArticleCard from '../ArticleCard'
import Pagination from '../Pagination'
import NoData from '../NoData'
import { useRouter } from 'next/router'
// import styles from './index.module.scss'

const ArticleList = ({ posts }) => {
  const router = useRouter()

  const handlePageChange = (num) => {
    const { pathname } = router
    const tabName = pathname.split('/')[1]

    if (num <= 1) {
      router.push(`/${tabName}`)
    } else {
      router.push(
        `/${tabName}/page/[num]`,
        `/${tabName}/page/${num}`
      )
    }
  }

  return (
    <div>
      {
        posts.list.length === 0 && <NoData />
      }
      {
        posts.list.length > 0 && posts.list.map(item => <ArticleCard key={item.id} article={item} />)
      }
      {/* 分页器 */}
      {
        posts.count > 0
          ? <Pagination
            total={posts.count}
            pageSize={posts.pageSize}
            current={parseInt(router.query.num) || 1}
            onChange={(pageNum) => handlePageChange(pageNum)}
          />
          : null
      }
    </div>
  )
}

ArticleList.propTypes = {
  posts: PropTypes.object.isRequired,
  query: PropTypes.object
}

export default ArticleList
