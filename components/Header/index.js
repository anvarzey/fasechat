import styles from './styles.module.css'
import Image from 'next/image'
import logo from '../../public/logo2.png'
import { useUser } from '../../context/AuthContext'
import Button from '../Button'

export default function Header () {
  const { handleLogout, user } = useUser()

  const handleClick = () => {
    if (user) handleLogout()
  }

  return (
    <header className={styles.container}>
      <div className={styles.logoContainer}>
        <Image src={logo} alt='logo' width={40} height={40} />
        <h1>Fasechat Room</h1>
      </div>
      <Button color='red' handleClick={handleClick} icon='bi bi-power' text='Logout' />
    </header>
  )
}
