import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import 'dayjs/locale/zh-cn'
// 全局样式
import '../styles/variable.scss'
import '../styles/global.scss'
import '../styles/markdown.scss'
import 'react-toastify/dist/ReactToastify.css'
// import 'highlight.js/scss/github.scss'
// import 'github-markdown-css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useRouter } from 'next/router'

function MyApp ({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      NProgress.start()
    })
    router.events.on('routeChangeComplete', () => NProgress.done())
    router.events.on('routeChangeError', () => NProgress.done())
  })

  // eslint-disable-next-line react/jsx-filename-extension, react/jsx-props-no-spreading
  return <Component {...pageProps} />
}

export default MyApp

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape.isRequired
}
