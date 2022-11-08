import React, {useState} from 'react';
// import PropTypes from 'prop-types'
import styles from './index.module.scss'
import Icon from '../../components/Icon'
import { login } from '../../api/users'
import { ToastContainer, toast, Flip } from 'react-toastify';
import { useRouter } from 'next/router'
import Footer from '../../components/Footer';

export default function LogIn() {
  const router = useRouter()
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')

  const handleInputChange = (e, type) => {
    switch(type) {
      case 'ACCOUNT':
        setAccount(e.target.value)
        break;
      case 'PASSWORD':
        setPassword(e.target.value)
        break;
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

    try {
      let resData = await login({username: account, password})
      if (resData.code === 200) {
        toast.success('登录成功！')
        router.push('/home')
      }
    } catch(e) {
      toast.error(e.message)
    }
  }

  return (
    <>
      <div className={styles.LogIn}>
        <div className={styles.LogInWrapper}>
          <p className={styles.LogInTitle}>{'Jim\'s Space Login'}</p>
          <div className={styles.AccountInput}>
            <div className={styles.Icons}><Icon name="User" /></div>
            <input type="text" value={account}  onChange={(e) => handleInputChange(e, 'ACCOUNT')} />
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
