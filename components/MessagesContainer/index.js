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

  const scroller = (height) => {
    const size = height === 'all' ? chatContainer.current.scrollHeight : 600
    chatContainer.current.scroll({
      top: size,
      left: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    if (refresh && messages.length) {
      scroller('all')
      handleRefresh()
    }
  }, [refresh, handleRefresh, messages?.length])

  const handleClick = async () => {
    await incrementByTen()
    scroller()
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
