import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import 'dayjs/locale/zh-cn'
// 全局样式
import '../styles/variable.css'
import '../styles/global.css'
import '../styles/common.css'
// import 'highlight.js/scss/github.scss'
import '../styles/github-markdown.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {useRouter} from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeStart', (url) => {
      console.log(`Loading: ${url}`)
      NProgress.start()
    })
    router.events.on('routeChangeComplete', () => NProgress.done())
    router.events.on('routeChangeError', () => NProgress.done())
  }, [])

  return <Component {...pageProps} />
}

export default MyApp

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object
}
