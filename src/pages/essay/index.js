import Layout from '../../components/Layout'
import {getList, getHitokoto} from '../../api'
import ArticleList from '../../components/ArticleList'

// This function gets called at build time
export async function getStaticProps() {
  const params = {
    pageSize: 10,
    pageNum: 1,
    keyword: '',
    tabType: 10
  }

  const posts = await getList(params)
  const hitokoto = await getHitokoto()
  return { props: { posts, hitokoto } }
}

export default function Home({posts, hitokoto}) {
  return (
    <Layout hitokoto={hitokoto}>
      <ArticleList posts={posts}/>
    </Layout>
  )
}
