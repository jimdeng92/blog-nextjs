import React from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.css'

const Wrapper = (props) => {
  return (
    <div className={styles.Wrapper}>
      {props.children}
    </div>
  )
}

export default Wrapper

Wrapper.propTypes = {
  children: PropTypes.element
}
