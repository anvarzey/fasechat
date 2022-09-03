import styles from './styles.module.css'
import Image from 'next/image'
import { useState } from 'react'
import dynamic from 'next/dynamic'
const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false })

export default function InputMessage ({ handleChange, handleEmojiClick, message, resize, user }) {
  const [show, setShow] = useState(false)

  const pickerStyles = {
    display: show === true ? 'flex' : 'none',
    position: 'absolute',
    bottom: '2rem',
    right: '-1rem'
  }

  const emojiStyles = {
    color: show ? 'darkgreen' : 'black'
  }

  const handleShowPicker = () => {
    setShow(!show)
  }

  return (
    <div className={styles.container} resize={resize}>
      <div className={styles.avatarContainer}>
        <Image
          src={user.avatar}
          width={30}
          height={30}
          alt={`${user.username}'s avatar`}
        />
      </div>
      <textarea
        className={styles.textarea}
        value={message}
        onChange={handleChange}
        placeholder='Type a message'
      />
      <label className={styles.pickerContainer}>
        <Picker
        onEmojiClick={handleEmojiClick}
        disableAutoFocus={true}
        pickerStyle={pickerStyles}
        />
        <i className='bi bi-emoji-laughing' style={emojiStyles} show={show} onClick={handleShowPicker} />
      </label>
    </div>
  )
}
