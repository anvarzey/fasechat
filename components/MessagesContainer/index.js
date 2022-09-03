import Message from '../Message'
import styles from './styles.module.css'
import { useEffect, useRef } from 'react'
import useMessages from '../../hooks/useMessages'

export default function MessagesContainer ({ handleRefresh, refresh, setModal }) {
  const chatContainer = useRef(null)

  const {
    disabled,
    incrementByTen,
    messages
  } = useMessages()

  const scroller = (height) => {
    const size = height === 'all' ? chatContainer.current.scrollHeight : 600
    chatContainer.current.scroll({
      behavior: 'smooth',
      left: 0,
      top: size
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
      <button className={styles.btn} disabled={disabled} onClick={handleClick}>
        Load more messages
      </button>
      {
        messages &&
          messages.length !== 0 &&
            messages.map(msg =>
              <Message
                avatar={msg.avatar}
                image={msg.image || null}
                key={msg.key}
                setModal={setModal}
                text={msg.message}
                username={msg.username}
              />
            )
      }
    </section>
  )
}
