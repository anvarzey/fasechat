import {
  getRedirectResult,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'

import { auth, provider } from './config'

export const logIn = () => signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result)
    const token = credential.accessToken
    const user = result.user
    return { credential, token, user }
  }).catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message

    return { code: errorCode, message: errorMessage }
  })

export const loggedUser = () => {
  getRedirectResult(auth)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken

      // The signed-in user info.
      const user = result.user
      return {
        token,
        user,
        credential
      }
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error)
      return { credential, errorCode, errorMessage }
    })
}
