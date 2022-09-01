import {
  createContext,
  useContext,
  useState
} from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { logIn } from '../firebase/auth'
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

  onAuthStateChanged(auth, (res) => {
    if (res) {
      const modifiedUser = {
        username: res.email.slice(0, -10),
        avatar: res.photoURL
      }
      setUser(modifiedUser)
    } else {
      setUser(null)
    }
  })

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

function useUser () {
  const context = useContext(AuthContext)
  return context
}

export { AuthProvider, useUser }
