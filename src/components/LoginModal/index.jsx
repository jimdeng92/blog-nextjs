import React, { useState } from 'react'
import ReactModal from 'react-modal'
import { XSquare } from 'lucide-react'
import styles from './index.module.scss'
import Image from 'next/image'
import Icon from '../../components/Icon'
import { ToastContainer, toast, Flip } from 'react-toastify'
import { aesEncrypt } from '../../utils/crypto'
import { login } from '../../api/users'

export default function useLoginModal () {
  const [isOpen, setIsOpen] = useState(false)
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')

  const open = () => {
    setIsOpen(true)
  }

  const close = () => {
    setIsOpen(false)
  }

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
      close()
      // router.push('/home')
    } catch (e) {
      toast.error(e.message)
    }
  }

  const LoginModal = () => {
    return (
      <>
        <ReactModal
          isOpen={isOpen}
          parentSelector={() => document.querySelector('#__next')}
          ariaHideApp={false}
          style={{
            content: {
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '360px',
              height: '252px',
              transform: 'translate(-50%, -50%)',
              border: '1px solid #ccc',
              background: '#fff',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '4px',
              outline: 'none',
              padding: '20px'
            }
          }}
        >
          <XSquare onClick={close} className={styles.closeIcon} />
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
        </ReactModal>
        <ToastContainer transition={Flip} />
      </>
    )
  }

  return {
    open,
    LoginModal
  }
}
