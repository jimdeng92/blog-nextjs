import React from 'react'
import styles from './index.module.scss'
import Link from 'next/link'
import {useRouter} from 'next/router'

const navList = [
  { id: 1, icon: 'icon-home', desc: '首页', to: '/home', exact: true },
  { id: 2, icon: 'icon-code', desc: '代码', to: '/code' },
  { id: 3, icon: 'icon-suibi', desc: '随笔', to: '/essay' }
]

const Nav = () => {
  const router = useRouter()
  
  return (
    <div className={styles.Nav}>
      {
      navList.map(item => {
        return (
          <Link
            exact={item.exact}
            key={item.id} 
            href={item.to}
          >
            <a className={[`${styles.HeaderNavbarSvg}`, `${`/${router.pathname.split('/')[1]}` === item.to ? styles.active : ''}`].join(' ')}>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref={'#' + item.icon}></use>
              </svg>
              {item.desc}
            </a>
          </Link>
        )
      })
    }
    </div>
  )
}

export default Nav
