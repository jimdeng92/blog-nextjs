import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import styles from './index.module.scss'
import Nav from '../Nav'
import Wrapper from '../Wrapper'

function NavBar (props) {
  const router = useRouter()
  const [title, setTitle] = React.useState('Jim\'s Space')

  // 设置标题
  useEffect(() => {
    if (router.pathname === '/posts/[pid]' && props.title) {
      setTitle(props.title)
    }
  }, [router.pathname, props.title])

  return (
    <div className={styles.NavBar}>
      <Wrapper>
        <div className={styles.NavBarWrapper}>
          <p>{title}</p>
          <Nav {...props} />
        </div>
      </Wrapper>
    </div>
  )
}

export default NavBar

NavBar.propTypes = {
  title: PropTypes.string
}
