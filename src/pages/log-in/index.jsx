import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import styles from './index.module.scss'
import Icon from '../../components/Icon'
import { login } from '../../api/users'
import { ToastContainer, toast, Flip } from 'react-toastify'
import { useRouter } from 'next/router'
import Footer from '../../components/Footer'
import { aesEncrypt } from '../../utils/crypto'
import NavBar from '../../components/NavBar'
import IndexPage from '../../components/IndexPage'
import Image from 'next/image'

export default function LogIn () {
  const router = useRouter()
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')

  const handleInputChange = (e, type) => {
    switch (type) {
      case 'ACCOUNT':
        setAccount(e.target.value)
        break
      case 'PASSWORD':
        setPassword(e.target.value)
        break
      default:
    }
  }

  // 登录
  const handleLogInClick = async () => {
    if (account.trim() === '') {
      toast.warn('请输入账户')
      return
    }
    if (password.trim() === '') {
      toast.warn('请输入密码')
      return
    }

    // 密码加密
    const ciphertext = aesEncrypt(password, process.env.NEXT_PUBLIC_SECRET_KEY)

    try {
      const resData = await login({ username: account, password: ciphertext })
      if (resData.code !== 200) throw new Error(resData)
      toast.success('登录成功！')
      router.push('/home')
    } catch (e) {
      toast.error(e.message)
    }
  }

  return (
    <>
      <IndexPage />
      <NavBar />
      <div className={styles.LogIn}>
        <div className={styles.LogInWrapper}>

          <div className={styles.LogInTitle}>
            <Image src="/j_logo.png" alt="jim_logo" width={150} height={150} />
            <p>{'Jim\'s Space Login'}</p>
          </div>
          <div className={styles.AccountInput}>
            <div className={styles.Icons}><Icon name="User" /></div>
            <input type="text" value={account} onChange={(e) => handleInputChange(e, 'ACCOUNT')} />
          </div>
          <div className={styles.PasswordInput}>
            <div className={styles.Icons}><Icon name="Lock" /></div>
            <input type="password" value={password} onChange={(e) => handleInputChange(e, 'PASSWORD')} />
            {/* <Icon name="eye" className={styles.Icon} /> */}
          </div>
          <button className={styles.LogInButton} onClick={handleLogInClick}>登 录</button>
        </div>
      </div>
      <ToastContainer transition={Flip} />
      <Footer fixed />
    </>
  )
}

// LogIn.propTypes = {
//   posts: PropTypes.object.isRequired,
//   hitokoto: PropTypes.object.isRequired
// }
