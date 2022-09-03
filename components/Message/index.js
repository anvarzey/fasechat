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
                  alt={`${username}'s avatar`}
                  layout='fill'
                  objectFit='cover'
                  objectPosition='center'
                  src={avatar}
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
          <div className={styles.imageContainer} onClick={handleModal}>
            <Image
              alt={`image sent by ${username}`}
              layout='fill'
              objectFit='contain'
              objectPosition='center'
              src={image}
            />
          </div>
      }
      <p>
        {text}
      </p>
    </div>
  )
}
