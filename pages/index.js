import Layout from '../components/Layout'
import request from '../utils/fetch'
import ArticleList from '../components/ArticleList'

// This function gets called at build time
export async function getStaticProps() {
  const params = {
    pageSize: 10,
    pageNum: 1,
    keyword: ''
  }
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const {data} = await request('/api/blog/list', {
    method: 'POST',
    body: params
  })
  return {
    props: {
      posts: data,
    },
  }
}

export default function Home({posts}) {
  return (
    <Layout>
      <ArticleList posts={posts}/>
    </Layout>
  )
}
