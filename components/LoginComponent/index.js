import Image from 'next/image'
import styles from './styles.module.css'
import logo from '../../public/logo2.png'
import { useUser } from '../../context/AuthContext'

export default function LoginComponent () {
  const { handleLogin, user } = useUser()

  const handleClick = async () => {
    await handleLogin()
  }

  return (
    <div className={styles.container}>
      <label className={styles.logoContainer}>
        <Image alt='logo' height={100} src={logo} width={100} />
        Fasechat
      </label>
      <h2 className={styles.title}>
        <i>Connect with people from all over the world </i> 🌍
      </h2>
      {/* By default user is undefined, so the login button might not be visible until firebase responds that the user is not logged */}
        {
          user === null &&
            <button onClick={handleClick} className={styles.btn}>
              <span className={styles.line} />
              <span className={styles.line} />
              <span className={styles.line} />
              <span className={styles.line} />
              <span className={styles.googleContainer}>
                <Image
                  alt='Google logo'
                  height={40}
                  src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg'
                  width={40}
                />
              </span>
              Sign in with Google
            </button>
        }
    </div>
  )
}
