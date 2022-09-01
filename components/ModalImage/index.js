import Image from 'next/image'
import styles from './styles.module.css'

export default function ModalImage ({ modal, setModal }) {
  const handleClick = () => {
    setModal(null)
  }
  if (!modal) return <></>
  return (
    <div className={styles.container} show={String(Boolean(modal))}>
      <span className={styles.closeIconContainer} onClick={handleClick}>
        <i className='bi bi-x-lg' />
      </span>
      <div className={styles.imageContainer}>
        <Image src={modal?.image} layout='fill' objectFit='contain' objectPosition='center' alt={`Image sent by ${modal.username}`} />
      </div>
      {
        modal?.username &&
          <div className={styles.caption}>
            Message from {modal?.username}
          </div>
      }
    </div>
  )
}
