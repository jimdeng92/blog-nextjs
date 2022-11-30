import React from 'react'
import styles from './index.module.scss'
import Wrapper from '../Wrapper'
import PropTypes from 'prop-types'

const Footer = ({ fixed }) => {
  return (
    <>
      <div className={[styles.Footer, fixed && styles.fixed].join(' ')}>
        <Wrapper>
          <div className={styles.FooterWrapper}>
            © 2022 JimDeng .
            <a className={styles.reference} href="https://beian.miit.gov.cn" target="_blank" rel="noopener noreferrer">湘ICP备2022024308号</a>
          </div>
        </Wrapper>
      </div>
      {/* 固定定位时，创建一个相同高度的空div */}
      {
        fixed && <div className={styles.simpleBox}></div>
      }
    </>
  )
}

export default Footer

Footer.propTypes = {
  fixed: PropTypes.bool
}
