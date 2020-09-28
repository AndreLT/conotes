import React from 'react'
import useSWR from 'swr'

import {useAuth} from '../lib/auth'
import Authentication from '../components/authentication'
import UserNotes from './usernotes'


const Home = () => {
  const auth = useAuth();
  
  return <>
    {auth.user ?
      <UserNotes user={auth.user} />
      :
      <Authentication />
    }
  </>
}

export default Home