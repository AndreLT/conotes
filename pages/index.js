import React from 'react'
import useSWR from 'swr'

import {useAuth} from '../lib/auth'
import Authentication from '../components/authentication'
import Menu from '../components/menu'
import UserNotes from './usernotes'


const Home = () => {
  const auth = useAuth();
  
  return <div>
    {auth.user ?
      <UserNotes />
      :
      <Authentication />
    }
  </div>
}

export default Home