// 根目录
import React, {useEffect} from 'react'
import Layout from '../components/Layout'
import {useRouter} from 'next/router'

export default function Index() {
  const router = useRouter()
  
  useEffect(() => {
    router.prefetch('/home') // 预取
    if (router.pathname === '/') {
      router.replace('/home')
    }
  }, [])

  return (
    <Layout></Layout>
  )
}
