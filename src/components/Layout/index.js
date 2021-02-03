import React from 'react'
import Head from 'next/head'
import Header from '../Header'
import Footer from '../Footer'
import Wrapper from '../Wrapper'
import Tool from '../Tool'

const Layout = (props) => {

  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Jim's Space, Jim, JavaScript, React, Vue, ES6" />
        <link rel="icon" href="/favicon.ico" />
        <script src="//at.alicdn.com/t/font_2130365_wlk94v9y9am.js"></script>
        <title>Jim's Space</title>
      </Head>
      <Header hitokoto={props.hitokoto} title={props.title}/>
      <Wrapper>
        {props.children}
      </Wrapper>
      <Footer />
      <Tool />
    </div>
  )
}

export default Layout
