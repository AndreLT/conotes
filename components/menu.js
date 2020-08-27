import React, {useState} from 'react'
import {useAuth} from '../lib/auth'
import { Box, Button, Flex, Heading, ButtonGroup, Divider, Text } from '@chakra-ui/core'


const Menu = ({children}) => {
  const auth = useAuth();

  return <Flex direction="column" >
    <Flex justify="space-between" p={2}>
      <Box display="flex" direction="column" >
        <Heading size="lg" mr={2}>CoNotes</Heading>
        <ButtonGroup>
          <Button variant="ghost">Your Notes</Button>
          <Button>+ New Note</Button>
        </ButtonGroup>
      </Box>
      
      <Box>
        <Button onClick={() => auth.signout()}>Sign Out</Button>
      </Box>
    </Flex>
    <Divider />
    {children}
  </Flex>
  

}

export default Menu