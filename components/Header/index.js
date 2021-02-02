import React from 'react'
import styles from './index.module.css'
import Nav from '../Nav'
import Wrapper from '../Wrapper'

const Header = (props) => {
  const [hitokoto, setHitokoto] = React.useState('')
  const [wechatVisible, setWechatVisible] = React.useState(false)
  const [statementDom, setStatementDom] = React.useState(null)
  const [title] = React.useState('Jim\'s Space')
  const [navbarVisible, setNavBarVisible] = React.useState(false)

  // 获取一言
  const getHitokoto = () => {
    return fetch('https://v1.hitokoto.cn/')
      .then((res) => res.json())
      .catch((err) => {
        console.log(err)
      })
  }

  React.useEffect(() => {
    (async () => {
      try {
        const res = await getHitokoto()
        setHitokoto(res.hitokoto)
      } catch(e) {}
    })()
  }, [])

  // 监听滚动
  React.useEffect(() => {
    const fn = () => {
      const offsetTop = statementDom.offsetTop
      const scrollTop = document.documentElement.scrollTop
      setNavBarVisible(offsetTop < scrollTop)
    }
    window.addEventListener('scroll', fn)
    return () => {
      window.removeEventListener('scroll', fn)
    }
  })

  return (
    <div className={styles.Header}>
      <Wrapper>
        <div className={styles.HeaderTitle}>
          <h2 className={styles.HeaderTitleText}>
            {title}
          </h2> 
          <div className={styles.HeaderTitleIcons}>
            <a 
              className={styles.iconsContainer}
              href="https://github.com/jimdeng92" 
              rel="noopener noreferrer" 
              target="_blank" 
              title="jimdeng92"
            >
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-github"></use>
              </svg>
            </a>
            <div 
              className={styles.iconsContainer}
              onMouseEnter={() => {setWechatVisible(true)}} 
              onMouseLeave={() => {setWechatVisible(false)}}
            >
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-weixin"></use>
              </svg>
              {
                wechatVisible &&
                <div className={styles.wechatWrapper}>
                  <img src='/wechat.jpg' alt="wechat" />
                </div>
              }
            </div>
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
          <p>{hitokoto || '在末日中，人们总想寻找希望，但要真有希望的话，那还叫末日吗？'}</p>
        </Wrapper>
      </div>
      {
        navbarVisible &&
        <div className={styles.NavBar}>
          <Wrapper>
            <div className={styles.NavBarWrapper}>
              <p>{title}</p>
              <Nav {...props} />
            </div>
          </Wrapper>
        </div>
      }
    </div>
  )
}

export default Header
