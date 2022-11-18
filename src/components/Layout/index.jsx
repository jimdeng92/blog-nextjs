import React from 'react'
import PropTypes from 'prop-types'
import Header from '../Header'
import Footer from '../Footer'
import Wrapper from '../Wrapper'
import Tool from '../Tool'
import IndexPage from '../IndexPage'

const Layout = (props) => {
  return (
    <>
      <IndexPage title={props.title} digest={props.digest}/>
      <Header hitokoto={props.hitokoto} title={props.title} />
      <Wrapper>
        {props.children}
      </Wrapper>
      <Footer />
      <Tool />
    </>
  )
}

export default Layout

Layout.propTypes = {
  hitokoto: PropTypes.object,
  title: PropTypes.string,
  digest: PropTypes.string,
  children: PropTypes.node
}
