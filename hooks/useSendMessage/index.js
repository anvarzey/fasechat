import { useState } from 'react'
import { sendMessage } from '../../firebase/realtimeDB'
import { uploadPhoto } from '../../firebase/storage'
import { getDownloadURL } from 'firebase/storage'
import useMessages from '../useMessages'

export default function useSendMessage ({ handleRefresh, user }) {
  const [message, setMessage] = useState('')
  const [disabledBtn, setDisabledBtn] = useState(true)
  const [image, setImage] = useState(null)
  const { incrementByOne } = useMessages()

  const handleChange = (text) => {
    setMessage(text)
    const disabled = !text
    setDisabledBtn(disabled)
  }

  const handleImage = (e) => {
    const { files } = e.target
    setImage({
      file: files[0],
      preview: URL.createObjectURL(files[0])
    })
    if (disabledBtn) setDisabledBtn(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const regex = /\w+/ig
    if (!regex.test(message) && !image) {
      setMessage('')
      alert('Type a valid message')
      return
    }
    if (image) {
      uploadPhoto(image.file)
        .then(res => getDownloadURL(res.ref))
        .then((downloadURL) => sendMessage({ avatar: user.avatar, message, username: user.username, image: downloadURL }))
    } else {
      sendMessage({ avatar: user.avatar, message, username: user.username })
    }
    incrementByOne()
    handleRefresh()
    setMessage('')
    setImage(null)
    setDisabledBtn(true)
  }

  const handleDelete = () => {
    setImage(null)
    setDisabledBtn(true)
  }

  return {
    disabledBtn,
    handleChange,
    handleDelete,
    handleImage,
    handleSubmit,
    image,
    message
  }
}
