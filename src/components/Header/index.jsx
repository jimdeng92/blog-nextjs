import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from './index.module.css'
import Nav from '../Nav'
import Wrapper from '../Wrapper'
import Icon from '../Icon'
import NavBar from '../NavBar'

function Header (props) {
  const router = useRouter()
  const [statementDom, setStatementDom] = React.useState(null)
  const [title, setTitle] = React.useState('Jim\'s Space')
  const [navbarVisible, setNavBarVisible] = React.useState(false)

  // 监听滚动
  React.useEffect(() => {
    const fn = () => {
      const { offsetTop } = statementDom
      const { scrollTop } = document.documentElement
      setNavBarVisible(offsetTop < scrollTop)
    }
    window.addEventListener('scroll', fn)
    // 设置标题
    if (router.pathname === '/posts/[pid]' && props.title) {
      setTitle(props.title)
    }
    return () => {
      window.removeEventListener('scroll', fn)
    }
  }, [router.pathname, props.title, statementDom])

  return (
    <div className={styles.Header}>
      <Wrapper>
        <div className={styles.HeaderTitle}>
          <h2 className={styles.HeaderTitleText}>
            <Link href="/home">
              Jim&apos;s Space
            </Link>
          </h2>
          <div className={styles.HeaderTitleIcons}>
            {/* email */}
            <a
              className={styles.iconsContainer}
              href="mailto:jimdeng92@gmail.com"
              rel="noopener noreferrer"
              target="_blank"
              title="mailto: jimdeng92@gmail.com"
            >
              <Icon name="Mail" />
            </a>
            {/* github */}
            <a
              className={styles.iconsContainer}
              href="https://github.com/jimdeng92"
              rel="noopener noreferrer"
              target="_blank"
              title="GitHub"
            >
              <Icon name="Github" />
            </a>
            {/* login */}
            <Link href="/log-in" title="登录" className={styles.iconsContainer}>
              <Icon name="LogIn" />
            </Link>
          </div>
        </div>
        <div className={styles.HeaderNavbar}>
          <Nav
            {...props}
          />
        </div>
      </Wrapper>
      <div
        className={styles.HeaderStatement}
        ref={(el) => { setStatementDom(el) }}
      >
        <Wrapper>
          <p>{props?.hitokoto?.hitokoto}</p>
        </Wrapper>
      </div>
      {
        navbarVisible && <NavBar title={title} />
      }
    </div>
  )
}

export default Header

Header.propTypes = {
  hitokoto: PropTypes.object,
  title: PropTypes.string
}
