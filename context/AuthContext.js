import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { logIn, logInGuest } from '../firebase/auth'
import { auth } from '../firebase/config'

const AuthContext = createContext()

function AuthProvider ({ children }) {
  const [user, setUser] = useState(undefined)

  /*
    user === undefined, waiting the user status from Firebase
    user === null, user is not logged
    else user is logged
  */

  function handleLogin () {
    logIn().then(res => {
      if (!res.user) {
        setUser(null)
      } else {
        const modifiedUser = {
          username: res.user.email.slice(0, -10),
          avatar: res.user.photoURL
        }
        setUser(modifiedUser)
      }
    })
  }

  function handleLogout () {
    signOut(auth)
  }

  function handleGuest () {
    logInGuest().then(res => {
      if (!res.user) {
        setUser(null)
      } else {
        const modifiedUser = {
          username: 'Guest',
          avatar: undefined
        }
        setUser(modifiedUser)
      }
    })
  }

  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (res) {
        let modifiedUser
        if (res.email !== null) {
          modifiedUser = {
            username: res.email.slice(0, -10),
            avatar: res.photoURL
          }
        } else {
          modifiedUser = {
            username: 'Guest',
            avatar: undefined
          }
        }
        setUser(modifiedUser)
      } else {
        setUser(null)
      }
    })
  }, [auth])

  return (
    <AuthContext.Provider value={{ user, handleGuest, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

function useUser () {
  const context = useContext(AuthContext)
  return context
}

export { AuthProvider, useUser }
