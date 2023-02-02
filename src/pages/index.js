// 根目录<入口文件>
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'

export default function Index () {
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/home') // 预取
    if (router.pathname === '/') {
      router.replace('/home')
    }
  }, [router])

  return (
    <Layout />
  )
}
