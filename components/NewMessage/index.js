import styles from './styles.module.css'
import Image from 'next/image'
import useSendMessage from '../../hooks/useSendMessage'
import { useUser } from '../../context/AuthContext'
import Button from '../Button'
import InputMessage from '../InputMessage'

export default function NewMessage ({ handleRefresh, setModal }) {
  const { user } = useUser()
  const {
    disabledBtn,
    handleChange,
    handleDelete,
    handleEmojiClick,
    handleImage,
    handleSubmit,
    image,
    message
  } = useSendMessage({ handleRefresh, user })

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
                    alt='Preview image to send'
                    height={100}
                    objectFit='contain'
                    objectPosition='center'
                    onClick={showPreview}
                    src={image.preview}
                    width={120}
                  />
                  <button className={styles.cancelImg} onClick={handleDelete}>X</button>
                </div>
              </div>
          }
          <InputMessage
          handleChange={handleChange}
          handleEmojiClick={handleEmojiClick}
          message={message}
          resize={String(Boolean(image))}
          user={user}
          />
        </div>
        <Button color='green' disabled={disabledBtn} icon='bi bi-send' text='Send' />
      </form>
    </>
  )
}
