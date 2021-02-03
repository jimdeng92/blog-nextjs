import React from 'react'
import PropTypes from 'prop-types'
import 'dayjs/locale/zh-cn'
// 全局样式
import '../styles/variable.css'
import '../styles/global.css'
import '../styles/common.css'
// import 'highlight.js/scss/github.scss'
import '../styles/github-markdown.css'

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
}

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
