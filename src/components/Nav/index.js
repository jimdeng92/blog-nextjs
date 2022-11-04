import React from 'react'
import styles from './index.module.scss'
import Link from 'next/link'
import {useRouter} from 'next/router'
import Icon from '../Icon'

const navList = [
  { id: 1, iconName: 'Home', desc: '首页', to: '/home' },
  { id: 2, iconName: 'Code', desc: '代码', to: '/code' },
  { id: 3, iconName: 'Pencil', desc: '随笔', to: '/essay' }
]

const Nav = () => {
  const router = useRouter()

  return (
    <div className={styles.Nav}>
      {
      navList.map(item => {
        return (
          <Link
            key={item.id}
            href={item.to}
            className={[`${styles.HeaderNavbarSvg}`, `${`/${router.pathname.split('/')[1]}` === item.to ? styles.active : ''}`].join(' ')}
          >
            <Icon name={item.iconName} />
            {item.desc}
          </Link>
        )
      })
    }
    </div>
  )
}

export default Nav
