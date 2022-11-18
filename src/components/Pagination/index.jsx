import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.scss'

// 左边的省略号
const LeftEllipsis = (props) => {
  return (
    <>
      <div className={styles.PaginationItem} onClick={() => { props.handleItemClick(0) }}> 1 </div>
      <div>...</div>
    </>
  )
}

// 右边的省略号
const RightEllipsis = (props) => {
  return (
    <>
      <div>...</div>
      <div className={styles.PaginationItem} onClick={() => { props.handleItemClick(props.totalPage - 1) }}>
        {props.totalPage}
      </div>
    </>
  )
}

/**
 * 分页器
 * @param {number} total 必须，总条数
 * @param {number} current 非必须，当前页，默认 1
 * @param {number} pageSize 非必须，每页条数，默认 10
 * @param {boolean} hideOnSinglePage 非必须，只有一页时是否隐藏分页器， 默认 false
 * @param {function} onChange 非必须，页码改变的回调，参数是当前页码
 */
const Pagination = ({
  total,
  onChange,
  current = 1,
  pageSize = 10,
  hideOnSinglePage = false
}) => {
  const [totalPage] = useState(Math.ceil(total / pageSize))
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    setActiveIndex(current - 1)
  }, [current])

  // 点击 item
  function handleItemClick (index) {
    if (index === activeIndex) return
    // setActiveIndex(index) // 切换路由前不改变组件状态
    onChange && onChange(index + 1)
  }

  // 只有一页时是否隐藏分页器
  if (hideOnSinglePage && totalPage <= 1) return null

  return (
    <div className={styles.Pagination}>
      {/* 上一页 */}
      <div
        className={[
            `${styles.PaginationItem}`,
            `${activeIndex === 0 ? styles.hidden : ''}`
        ].join(' ')
        }
        onClick={() => { handleItemClick(activeIndex - 1) }}
      > « </div>
      {/* 小于等于 5 页 */}
      {
        totalPage <= 5 && [...Array(totalPage).keys()].map((item, index) => {
          return (
            <div
              className={[
                  `${styles.PaginationItem}`,
                  `${activeIndex === index ? styles.active : ''}`
              ].join(' ')
              }
              key={index}
              onClick={() => { handleItemClick(index) }}
            >
              {index + 1}
            </div>
          )
        })
      }
      {/* 大于 5 页 && 在前 3 页 */}
      {
        (totalPage > 5 && activeIndex <= 2) && (
          <>
            {
              [...Array(activeIndex + 2).keys()].map((item, index) => {
                return (
                  <div
                    className={[
                        `${styles.PaginationItem}`,
                        `${activeIndex === index ? styles.active : ''}`
                    ].join(' ')
                    }
                    key={index}
                    onClick={() => { handleItemClick(index) }}
                  >
                    {index + 1}
                  </div>
                )
              })
            }
            <RightEllipsis handleItemClick={handleItemClick} totalPage={totalPage}/>
          </>
        )
      }
      {/* 大于 5 页 && 不在前 3 页 */}
      {
        (totalPage > 5 && activeIndex > 2) && (
          <>
            <LeftEllipsis handleItemClick={handleItemClick}/>
            {
              // 在后 3 页数组长度取 totalPage - activeIndex + 1
              // 在中间数组长度取 3
              [...Array(totalPage - activeIndex <= 3 ? (totalPage - activeIndex + 1) : 3).keys()].map((item, index) => {
                return (
                  <div
                    className={[
                        `${styles.PaginationItem}`,
                        `${index === 1 ? styles.active : ''}`
                    ].join(' ')
                    }
                    key={activeIndex + index - 1}
                    onClick={() => { handleItemClick(activeIndex + index - 1) }}
                  >
                    {activeIndex + index}
                  </div>
                )
              })
            }
            {
              // 不在后 3 页：右边的省略号
              totalPage - activeIndex > 3 && <RightEllipsis handleItemClick={handleItemClick} totalPage={totalPage}/>
            }
          </>
        )
      }
      {/* 下一页 */}
      <div
        className={[
            `${styles.PaginationItem}`,
            `${activeIndex === totalPage - 1 ? styles.hidden : ''}`
        ].join(' ')
        }
        onClick={() => { handleItemClick(activeIndex + 1) }}
      > » </div>
    </div>
  )
}

export default Pagination

LeftEllipsis.propTypes = {
  handleItemClick: PropTypes.func.isRequired
}

RightEllipsis.propTypes = {
  handleItemClick: PropTypes.func.isRequired,
  totalPage: PropTypes.number
}

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  current: PropTypes.number,
  pageSize: PropTypes.number,
  hideOnSinglePage: PropTypes.bool
}
