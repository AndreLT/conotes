import React from 'react'
import { Button, Text } from '@chakra-ui/core'
import Authentication from '../components/authentication'
import {useAuth} from '../lib/auth'

const Home = () => {
  const auth = useAuth();

  return <div>
    {auth.user ?
      <div>
        <Text fontSize="3xl">{auth.user.email}</Text>
        <Button onClick={() => auth.signout()}>Sign out</Button>
      </div>
      :
      <Authentication />
    }
  </div>
}

export default Home