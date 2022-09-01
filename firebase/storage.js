import { ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from './config'

export const uploadPhoto = (file) => {
  const storageRef = ref(storage, 'images/' + file.name)
  const uploadTask = uploadBytesResumable(storageRef, file)

  uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      return progress
    },
    (error) => {
      switch (error.code) {
        case 'storage/unauthorized':
          break
        case 'storage/canceled':
          break
        case 'storage/unknown':
          break
      }
    })
  return uploadTask
}
