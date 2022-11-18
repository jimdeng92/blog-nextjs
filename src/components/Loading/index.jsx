import React from 'react'
import styles from './index.module.scss'

export default function Loading () {
  return (
    <div className={styles.LoadingWrap}>
      <svg className="icon" aria-hidden="true">
        <use xlinkHref="#icon-loading"></use>
      </svg>
      <span className={styles.LoadingText}>加载中...</span>
    </div>
  )
}
