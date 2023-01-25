import styles from './styles.module.css'
import { useUser } from '../../context/AuthContext'

export default function GuestFooter () {
  const { handleLogout } = useUser()

  return (
    <footer className={styles.container}>
      <div className={styles.message}>
        You are signed as guest. To send a message, please <button className={styles.btn} onClick={handleLogout}> log in</button>
      </div>
    </footer>
  )
}
