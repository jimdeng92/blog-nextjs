import React from 'react'
import styles from './index.module.css'
import Link from 'next/link'

const navList = [
  { id: 1, icon: 'icon-home', desc: '首页', to: '/home', exact: true },
  { id: 2, icon: 'icon-code', desc: '代码', to: '/code' },
  { id: 3, icon: 'icon-suibi', desc: '随笔', to: '/essay' }
]

const Nav = () => {
  
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
            <a className={styles.HeaderNavbarSvg}>
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
