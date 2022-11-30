import React from 'react'
import Layout from '../../components/Layout'
import { getHitokoto } from '../../api'
import bookmarkMD from '../../lib/markdown'
import { markdown2Html } from '../../utils/common'

const Bookmark = ({ hitokoto, md }) => {
  return (
    <Layout hitokoto={hitokoto}>
      <div className="post-body" dangerouslySetInnerHTML={markdown2Html(md)} />
    </Layout>
  )
}

export default Bookmark

export async function getStaticProps () {
  const hitokoto = await getHitokoto()
  return {
    props: { hitokoto, md: bookmarkMD },
    revalidate: 1 // 增量再生（更新生成的页面），从后台更新页面
  }
}
