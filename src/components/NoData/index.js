import React from 'react';
import styles from './index.module.scss'
import Icon from '../../components/Icon'

export default function NoData() {
  return (
    <div className={styles.NoDataWrap}>
      <Icon name="Slash" size={60} />
      <span className={styles.NoDataText}>没有文章</span>
    </div>
  )
}
