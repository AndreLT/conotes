import React from 'react'
import Head from 'next/head';
import useSWR from 'swr'

import {useAuth} from '../lib/auth'
import Authentication from '../components/authentication'
import UserNotes from './usernotes'


const Home = () => {
  const auth = useAuth();
  
  return <>
    <Head>
      <script
        dangerouslySetInnerHTML={{
          __html: `
        if (document.cookie && document.cookie.includes('auth-conotes')) {
          window.location.href = "/usernotes"
        }
      `
        }}
      />
    </Head>
    {auth.user ?
      <UserNotes user={auth.user} />
      :
      <Authentication />
    }
  </>
}

export default Home