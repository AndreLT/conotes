import React, {useState} from 'react'
import {useAuth} from '../lib/auth'
import Link from 'next/link'
import { Box, Button, Flex, ButtonGroup, PseudoBox, Text } from '@chakra-ui/core'

import useWindowsize from '../utils/windowsize'
import MenuDrawer from './menudrawer'

const Menu = ({children}) => {
  const auth = useAuth();
  const user = auth.user;

  const windowsize = useWindowsize();
  return (
  <>
    <Flex direction="row" borderColor="grey.200" boxShadow="md">
      <Box minW="140px" bg="blue.300" py={4} px={8}>
        <Text color="white">Co-Notes</Text>
      </Box>
      {(windowsize.width < 570)? 
        <Flex w="100%" justify="flex-end" align="center" m={2}>
          <MenuDrawer />
        </Flex>
        :<Flex justify="space-between" w="100%">
          <Box>
            <Link href="/usernotes" passHref>
              <PseudoBox
              as="button"
              cursor="pointer"
              fontWeight="semibold"
              px={4}
              py={4}
              mx={2}
              ml={8}
              bg="white"
              _hover={{ bg: "#f2f7ff" }}
              >
                  Your Notes
              </PseudoBox>
            </Link>
            <Link href="/newnote" passHref>
              <PseudoBox
                as="button"
                cursor="pointer"
                fontWeight="semibold"
                px={4}
                py={4}
                mx={2}
                ml={8}
                bg="#deebff"
                _hover={{ bg: "#adceff" }}
              >
                + New Note
              </PseudoBox>
            </Link>
          </Box>
      
          <Flex direction='row' align='center'>
            <Text>Signed in as {auth?.user?.displayName}</Text>
            <Button onClick={() => auth.signout()} m={2}>Sign Out</Button>
          </Flex>
        </Flex>
        }
    </Flex>
    <Flex justify="center">
      <Box w={["100%", "90%" ,"80%","70%", "60%"]} mt={4}>
        {children}
      </Box>
    </Flex>
    
  </>
  )

}

export default Menu