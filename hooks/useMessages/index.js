import { useEffect, useState } from 'react'
import {
  limitToLast,
  onChildAdded,
  onValue,
  orderByKey,
  query,
  ref
} from 'firebase/database'
import { database } from '../../firebase/config'

export default function useMessages () {
  const [messages, setMessages] = useState([])
  const [limit, setLimit] = useState(20)
  const [disabled, setDisabled] = useState(true)
  const [manual, setManual] = useState(false)

  const incrementByOne = () => {
    setLimit(limit + 1)
  }

  const incrementByTen = () => {
    setLimit(limit + 10)
    setManual(true)
  }
  const inter = []
  const messagesListRef = query(ref(database, 'messages'), orderByKey(), limitToLast(limit))

  const first = async () => {
    await onValue(messagesListRef, (snapshot) => {
      for (const [keyName, data] of Object.entries(snapshot.val())) {
        if (inter.every(elem => elem.key !== keyName)) {
          inter.push({ key: keyName, ...data })
        }
      }
      setMessages(inter)
    }, {
      onlyOnce: true
    })
  }

  const listener = () => {
    onChildAdded(messagesListRef, (data) => {
      if (!messages.find(mes => mes.key === data.key)) {
        if (manual) {
          setMessages([{ key: data.key, ...data.val() }, ...messages])
        } else {
          setMessages([...messages, { key: data.key, ...data.val() }])
          setDisabled(!disabled)
        }
      }
    })
  }

  useEffect(() => {
    if (inter.length === 0) {
      first()
    }
  }, [])

  useEffect(() => {
    if (messages.length > 0) {
      listener()
    }
    if (!disabled && messages.length !== limit) {
      setDisabled(true)
    }

    if (disabled && messages.length === limit) {
      setDisabled(false)
    }
  }, [messagesListRef, limit])

  return { disabled, incrementByOne, incrementByTen, messages }
}
