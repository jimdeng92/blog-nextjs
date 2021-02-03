import React from 'react'
import styles from './index.module.css'
import Wrapper from '../Wrapper'

const Footer = () => {
  return (
    <div className={styles.Footer}>
      <Wrapper>
        <div className={styles.FooterWrapper}>
          <div>
            © 2021 JimDeng . 
            <a className={styles.reference} href="http://www.miit.gov.cn/" target="_blank" rel="noopener noreferrer">粤ICP备2021011703号-1</a>
          </div>
          <div>
            Theme by 
            <a className={styles.adams} href="https://biji.io" target="_blank" rel="noopener noreferrer"> Adams </a>
          </div>
        </div>
      </Wrapper>
    </div>
  )
}

export default Footer
