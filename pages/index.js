import Head from 'next/head'
import { useRouter } from 'next/router'
import LoginComponent from '../components/LoginComponent'
import { useEffect } from 'react'
import { useUser } from '../context/AuthContext'

export default function Login () {
  const router = useRouter()
  const { user } = useUser()

  useEffect(() => {
    if (user) router.replace('./home')
  }, [user, router])

  return (
    <div>
      <Head>
        <title>Fasechat</title>
        <link rel='icon' href='/tablogo.jpg' />
      </Head>
      {/* By default user is undefined, so the login component might not be visible until firebase responds that the user is not logged */}
      {
        user === null && <LoginComponent />
      }
    </div>
  )
}
