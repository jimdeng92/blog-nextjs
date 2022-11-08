import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import 'dayjs/locale/zh-cn'
// 全局样式
import '../styles/variable.scss'
import '../styles/global.scss'
import '../styles/markdown.scss'
// import 'highlight.js/scss/github.scss'
// import 'github-markdown-css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {useRouter} from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?3f5f6f32015075cc5e29b7d50b6e9917";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
  })

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
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
