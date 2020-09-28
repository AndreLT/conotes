import React from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Heading,
  Icon,
  IconButton,
  Text,
} from '@chakra-ui/core'

import {useAuth} from '../lib/auth'
import PopoverSignout from '../utils/popoversignout'

const UserProfile = ({ user }) => {
  const auth = useAuth();

  return (
    <Flex align="center" w="90vw" margin={4} direction="row" justify="space-evenly">
      <Box color="white">
        <Heading size="md">
          {user.displayName}
          <IconButton variant="link" outline="none" size="lg" icon="edit" color="white" onClick={() => console.log("updating username")}/>
        </Heading>
        <Text mt={2} ml={1}>{user.email}</Text>
      </Box>
      <Divider h="13vh" orientation="vertical" borderColor="white" />
      <Box>
        <Heading color="white">{user.notes}</Heading>
        <Text color="white"> Notes </Text>
      </Box>
      <Divider h="13vh" orientation="vertical" borderColor="white" />
      <Flex  align="flex-end" direction="column">

          <Button mb={2} color="white" variant="link">Reset Password</Button>

          <Button mb={2} color="white" variant="link">Edit Profile Name</Button>
          
          <PopoverSignout>
            <Button mb={2} color="white" variant="link">Sign Out</Button>
          </PopoverSignout>

          <Button color="#dF041D" variant="link">Delete Account</Button>

      </Flex>
    </Flex>
  )
}

export default UserProfile;