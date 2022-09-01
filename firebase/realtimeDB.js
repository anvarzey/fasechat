import {
  push,
  ref,
  set
} from 'firebase/database'
import { database } from './config'

export const sendMessage = ({ avatar, image, message, username }) => {
  const messagesListRef = ref(database, 'messages')
  const newMsgRef = push(messagesListRef)
  const msgObj = image ? { avatar, image, message, username } : { avatar, message, username }
  set(newMsgRef, msgObj)
}
