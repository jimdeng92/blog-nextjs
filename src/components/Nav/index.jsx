import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './index.module.scss'
import Icon from '../Icon'

const navList = [
  {
    id: 1, iconName: 'Home', desc: '首页', to: '/home'
  },
  {
    id: 2, iconName: 'Code', desc: '技术', to: '/code'
  },
  {
    id: 3, iconName: 'Coffee', desc: '生活', to: '/essay'
  },
  {
    id: 4, iconName: 'Bookmark', desc: '收藏', to: '/bookmark'
  }
]

function Nav () {
  const router = useRouter()

  return (
    <div className={styles.Nav}>
      {
      navList.map((item) => (
        <Link
          key={item.id}
          href={item.to}
          className={[`${styles.HeaderNavbarSvg}`, `${`/${router.pathname.split('/')[1]}` === item.to ? styles.active : ''}`].join(' ')}
        >
          <Icon name={item.iconName} />
          {item.desc}
        </Link>
      ))
    }
    </div>
  )
}

export default Nav
