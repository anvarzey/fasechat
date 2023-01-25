import Head from 'next/head'
import Header from '../../components/Header'
import Loader from '../../components/Loader'
import MessagesContainer from '../../components/MessagesContainer'
import ModalImage from '../../components/ModalImage'
import NewMessage from '../../components/NewMessage'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '../../context/AuthContext'
import styles from './styles.module.css'
import GuestFooter from '../../components/GuestFooter'

export default function Home () {
  const { user } = useUser()
  const router = useRouter()
  const [refresh, setRefresh] = useState(true)
  const [modal, setModal] = useState(null)

  const handleRefresh = () => {
    setRefresh(!refresh)
  }

  useEffect(() => {
    if (user === null) router.replace('/')
  })

  return (
    <>
      <Head>
        <title>Home | Fasechat</title>
        <link rel='icon' href='/tablogo.jpg' />
      </Head>
      {user
        ? <div className={styles.container}>
          <div className={styles.subContainer}>
            <Header />
            <MessagesContainer
              setModal={setModal}
              refresh={refresh}
              handleRefresh={handleRefresh}
            />
            {
            user.username === 'Guest'
              ? <GuestFooter />
              : <>
                <ModalImage modal={modal} setModal={setModal} />
                <NewMessage setModal={setModal} handleRefresh={handleRefresh} />
              </>
              }
          </div>
        </div>
        : <Loader />}
    </>
  )
}
