import React from 'react';
import PropTypes from 'prop-types'
import Head from 'next/head'
import Script from 'next/script'


const IndexPage = (props) => {
  return (
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
      <link rel="icon" href="/favicon.ico" />
      <link href="https://fonts.googlefonts.cn/css?family=Monda:400,700|PT+Mono|Roboto+Slab:300,400,700" rel="stylesheet" />
      {/* 友盟统计 */}
      <Script src="https://s9.cnzz.com/z_stat.php?id=1279718538&web_id=1279718538" />
      <title>{props.title || 'Jim\'s Space'}</title>
    </Head>
  )
}

export default IndexPage

IndexPage.propTypes = {
  title: PropTypes.string,
  digest: PropTypes.string
}
