import styles from './styles.module.css'
import InputEmoji from 'react-input-emoji'
import Image from 'next/image'
import useSendMessage from '../../hooks/useSendMessage'
import { useUser } from '../../context/AuthContext'
import Button from '../Button'

export default function NewMessage ({ handleRefresh, setModal }) {
  const { user } = useUser()
  const {
    disabledBtn,
    handleChange,
    handleDelete,
    handleImage,
    handleSubmit,
    image,
    message
  } = useSendMessage({ user, handleRefresh })

  const showPreview = () => {
    setModal({ image: image.preview })
  }

  return (
    <>
      <form className={styles.container} onSubmit={handleSubmit}>
        <label htmlFor='image-input'>
          <Button
            altText='true'
            color='cyan'
            hmtlFor='image-input'
            icon='bi bi-image'
            text='Insert image'
            type='div'
          />
        </label>
        <input
          className={styles.imgInput}
          type='file'
          id='image-input'
          onChange={handleImage}
        />
        <div className={styles.messageContainer}>
          {
            image &&
              <div className={styles.previewContainer}>
                <div className={styles.previewImgContainer}>
                  <Image
                    onClick={showPreview}
                    src={image.preview}
                    objectFit='contain'
                    objectPosition='center'
                    width={120}
                    height={100}
                    alt='Preview image to send'
                  />
                  <button className={styles.cancelImg} onClick={handleDelete}>X</button>
                </div>
              </div>
          }
          <div className={styles.msgAreaContainer} resize={String(Boolean(image))}>
            <div className={styles.avatarContainer}>
              <Image
                src={user.avatar}
                width={30}
                height={30}
                alt={`${user.username}'s avatar`}
              />
            </div>
            <InputEmoji
              value={message}
              onChange={handleChange}
              placeholder='Type a message'
              borderColor='white'
            />
          </div>
        </div>
        <Button color='green' disabled={disabledBtn} icon='bi bi-send' text='Send' />
      </form>
    </>
  )
}
