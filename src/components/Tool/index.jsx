import React from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.scss'
import { useRouter } from 'next/router'
import Icon from '../Icon'
import Link from 'next/link'

const Tool = (props) => {
  const router = useRouter()
  const [topFlag, setTopFlag] = React.useState(false)
  // const [searchVisible, setSearchVisible] = React.useState(false)
  // const [searchVal, setSearchVal] = React.useState('')
  const [hasTheme, setHasTheme] = React.useState(false)
  // const inputEl = React.useRef(null)

  React.useEffect(() => {
    const fn = () => {
      setTopFlag(document.documentElement.scrollTop > 300)
    }
    document.addEventListener('scroll', fn)
    return () => {
      document.removeEventListener('scroll', fn)
    }
  })

  // 返回顶部
  function handleBackToTop () {
    // window.scrollTo({
    //   top: 0,
    //   left: 0,
    //   behavior: "smooth"
    // })
    document.documentElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  // 返回首页
  function handleBackToHome () {
    router.push('/home')
  }

  // 主题切换
  function handleTheme () {
    const docEle = document.documentElement
    if (docEle.hasAttribute('theme')) {
      docEle.removeAttribute('theme')
      setHasTheme(false)
    } else {
      docEle.setAttribute('theme', 'eye')
      setHasTheme(true)
    }
  }

  return (
    <div className={styles.Tool}>
      {
        topFlag &&
        <div
          title="返回顶部"
          className={styles.iconsContainer}
          onClick={handleBackToTop}
        >
          <Icon name="ChevronsUp" />
        </div>
      }
      {
        router.pathname !== '/home' &&
          <div
            title="返回首页"
            className={styles.iconsContainer}
            onClick={handleBackToHome}
          >
            <Icon name="Home" />
          </div>
      }
      <div title="新建文章" className={styles.iconsContainer}>
        <Link href="/create-blog">
          <Icon name="ListPlus" />
        </Link>
      </div>
      <div
        title="切换主题"
        className={[`${hasTheme ? styles.eye : ''}`, styles.iconsContainer].join(' ')}
        onClick={handleTheme}
      >
        <Icon name="Palette"/>
      </div>
    </div>
  )
}

export default Tool

Tool.propTypes = {
  // history: PropTypes.object.isRequired,
  search: PropTypes.func
}
