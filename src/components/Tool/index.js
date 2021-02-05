import React from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.scss'
import { useRouter } from 'next/router'

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
  function handleBackToTop() {
    document.documentElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  // 返回首页
  function handleBackToHome() {
    router.push('/home')
  }

  // 搜索框 Toggle
  // function handleSearchToggle(e) {
  //   if (e.target.className === 'search-wrapper' || e.target.nodeName === 'INPUT') return
  //   setSearchVisible(!searchVisible)
  // }

  // React.useEffect(() => {
  //   // `current` 指向已挂载到 DOM 上的文本输入元素
  //   inputEl.current.focus();
  // }, [searchVisible])

  // 搜索框 Change
  // function handleSearchChange(e) {
  //   setSearchVal(e.target.value)
  // }

  // 搜索框 KeyUp
  // function handleSearchKeyUp(e) {
  //   // React 的 on 开头的事件都是合成事件，不是真实的，在原生的 DOM 上进行了封装，封装好之后交给事件池进行管理，合成事件对象可能会被重用，合成事件的所有属性也会随之被清空。所以当在异步处理程序（如 setTimeout 等等）中或者浏览器控制台中去访问合成事件的属性，默认 react 会把其属性全部设为 null。
  //  // 如果在 react 中想异步访问事件属性（如在 setTimeout 内），应该在处理事件时调用 event.persist() ，这会从事件池中移除该合成函数并允许对该合成事件的引用被保留下来。
  //   e.persist()
  //   if (e.keyCode === 13) {
  //     props.search(searchVal)
  //     setSearchVal('')
  //   }
  // }

  // 主题切换
  function handleTheme() {
    const docEle = document.documentElement
    if( docEle.hasAttribute('theme') ){
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
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-top"></use>
          </svg>
        </div>
      }
      {
        router.pathname !== '/home' && 
          <div 
            title="返回首页"
            className={styles.iconsContainer}
            onClick={handleBackToHome}
          >
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#icon-home"></use>
            </svg>
          </div>
      }
      {/* <div 
        title="搜索"
        className={styles.iconsContainer}
        onClick={handleSearchToggle}
      >
        <svg className="icon" aria-hidden="true">
          <use xlinkHref="#icon-search"></use>
        </svg>
        <div 
          className={[
            `${styles.searchWrapper}`,
            `${searchVisible ? styles.visible : ''}`
          ].join(' ')
          } 
        >
          <input 
            value={searchVal} 
            onChange={handleSearchChange}
            onKeyUp={handleSearchKeyUp}
            ref={inputEl}
            placeholder='输入关键词...'
          >
          </input>
        </div>
      </div> */}
      <div 
        title="切换主题"
        className={[`${hasTheme ? styles.eye : ''}`, styles.iconsContainer].join(' ')} 
        onClick={handleTheme}
      >
        <svg className="icon" aria-hidden="true">
          <use xlinkHref="#icon-theme"></use>
        </svg>
      </div>
    </div>
  )
}

export default Tool

Tool.propTypes = {
  // history: PropTypes.object.isRequired,
  search: PropTypes.func
}
