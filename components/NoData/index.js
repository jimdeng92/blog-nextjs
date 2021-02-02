import React from 'react';
import styles from './index.module.scss'

export default function NoData() {
  return (
    <div className={styles.NoDataWrap}>
      <svg className="icon" aria-hidden="true">
        <use xlinkHref="#icon-nodata"></use>
      </svg>
      <span className={styles.NoDataText}>没有文章</span>
    </div>
  )
}
