import Message from '../Message'
import styles from './styles.module.css'
import { useEffect, useRef } from 'react'
import useMessages from '../../hooks/useMessages'

export default function MessagesContainer ({ handleRefresh, refresh, setModal }) {
  const chatContainer = useRef(null)

  const {
    disabled,
    messages,
    incrementByTen
  } = useMessages()

  const scroller = () => {
    const currentSize = chatContainer.current.scrollHeight
    chatContainer.current.scrollTo({
      top: currentSize,
      left: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    if (refresh && messages.length) {
      scroller()
      handleRefresh()
    }
  }, [refresh, handleRefresh, messages.length])

  const handleClick = async () => {
    await incrementByTen()

    chatContainer.current.scroll({
      top: 600,
      left: 0,
      behavior: 'smooth'
    })
  }

  return (
    <section className={styles.container} ref={chatContainer}>
      <button onClick={handleClick} disabled={disabled} className={styles.btn}>
        Load more messages
      </button>
      {
        messages &&
          messages.length !== 0 &&
            messages.map(msg =>
              <Message
                key={msg.key}
                avatar={msg.avatar}
                image={msg.image || null}
                setModal={setModal}
                text={msg.message}
                username={msg.username}
              />
            )
      }
    </section>
  )
}
