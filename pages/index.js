import React from 'react'
import useSWR from 'swr'

import {useAuth} from '../lib/auth'
import Authentication from '../components/authentication'
import UserNotes from './usernotes'


const Home = () => {
  const auth = useAuth();
  
  return <>
    {auth.user ?
<<<<<<< Updated upstream
      <Menu>
        <UserNotes user={auth.user} />
      </Menu>
=======
      <UserNotes user={auth.user} />
>>>>>>> Stashed changes
      :
      <Authentication />
    }
  </>
}

export default Home