import React from 'react'
import ArticleCard from '../ArticleCard'
import Pagination from '../Pagination'
import NoData from '../NoData'
import styles from './index.module.scss'

const ArticleList = ({posts}) => {

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
        posts.count > 0 ?
          <Pagination 
            total={posts.count} 
            // onChange={(pageNum) => {getList({pageNum, keyword, pageSize})}} 
          /> : null
      }
    </div>
  )
}

export default ArticleList
