import styles from './styles.module.css'
import Image from 'next/image'
import { useUser } from '../../context/AuthContext'

export default function Message ({ avatar, image, setModal, text, username }) {
  const { user } = useUser()
  const own = user?.username === username

  const handleModal = () => {
    setModal({ username, image })
  }

  return (
    <div className={styles.container} own={String(own)}>
      {
        !own &&
          <div className={styles.userContainer}>
            <span className={styles.avatarContainer}>
              {
              avatar &&
                <Image
                  src={avatar}
                  layout='fill'
                  objectFit='cover'
                  objectPosition='center'
                  alt={`${username}'s avatar`}
                />
              }
            </span>
            <div className={styles.owner}>
              {username}
            </div>
          </div>
      }
      {
        image &&
          <div onClick={handleModal} className={styles.imageContainer}>
            <Image
              src={image}
              layout='fill'
              alt={`image sent by ${username}`}
              objectFit='contain'
              objectPosition='center'
            />
          </div>
      }
      <p>
        {text}
      </p>
    </div>
  )
}
