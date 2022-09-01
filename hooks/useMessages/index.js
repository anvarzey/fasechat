import { useState } from 'react'
import {
  limitToLast,
  onChildAdded,
  orderByKey,
  query,
  ref
} from 'firebase/database'
import { database } from '../../firebase/config'

export default function useMessages () {
  const [messages, setMessages] = useState([])
  const [limit, setLimit] = useState(20)
  const [disabled, setDisabled] = useState(true)

  const incrementByOne = () => {
    setLimit(limit + 1)
  }

  const incrementByTen = () => {
    setLimit(limit + 10)
  }
  const inter = []
  const messagesListRef = query(ref(database, 'messages/'), orderByKey(), limitToLast(limit))

  onChildAdded(messagesListRef, (data) => inter.push({ key: data.key, ...data.val() }))

  if ((!messages.length && inter.length > 0) || messages.length < inter.length) {
    setMessages(inter)
  }

  if (!disabled && inter.length !== limit) {
    setDisabled(true)
  }

  if (disabled && inter.length === limit) {
    setDisabled(false)
  }

  return { disabled, incrementByOne, incrementByTen, messages }
}
