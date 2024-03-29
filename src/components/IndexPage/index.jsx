import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import Script from 'next/script'

const IndexPage = (props) => {
  return (
    <>
      <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta name="renderer" content="webkit" />
      <meta name="force-rendering" content="webkit" />
      <meta name="author" content="JimDeng, jimdeng92@gmail.com"/>
      <meta name="format-detection" content="email=no, telephone=no"></meta>
      <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, minimum-scale=1, maximum-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta name="keywords" content={props.title || 'Jim\'s Space'} />
      <meta name="description" content={props.digest || 'JimDeng 的个人博客，记录生活点滴，学习心得。关于 CSS/JavaScript/Vue/React/Webpack/Node/Nextjs/小程序/面试'} />
      <link rel="icon" href="/j_logo.png" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={true} />
      <title>{props.title || 'Jim\'s Space'}</title>
    </Head>
      {/* 百度统计 */}
      <Script src="https://hm.baidu.com/hm.js?dfea8fd4a8de8465e7ac012f6e174cb1" />
    </>
  )
}

export default IndexPage

IndexPage.propTypes = {
  title: PropTypes.string,
  digest: PropTypes.string
}
