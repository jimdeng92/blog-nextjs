import React from 'react'
import Icon from '../Icon'
import styles from './index.module.scss'
import { capitalized } from '../../utils/common'

const Button = ({ onClick, iconName, children, type = 'primary' }) => {
  return (
    <div onClick={onClick} className={[styles['Button' + capitalized(type)], styles.Button].join(' ')}>
      <Icon name={iconName} />
      {children}
    </div>
  )
}

export default Button
