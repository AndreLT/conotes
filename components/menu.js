import React, { useState } from 'react'
import { useAuth } from '../lib/auth'
import Link from 'next/link'
import { 
  Box, 
  Button, 
  ButtonGroup,
  Collapse,
  Flex, 
  IconButton, 
  PseudoBox, 
  Text,} from '@chakra-ui/core' 
import { MdPowerSettingsNew } from 'react-icons/md'

import useWindowsize from '../utils/windowsize'
import MenuDrawer from './menudrawer'
import UserProfile from './userprofile'
import PopoverSingout from '../utils/popoversignout'

const Menu = ({ children }) => {
  const auth = useAuth();
  

  const [profileVisible, setProfileVisible] = useState(false);
  const [singoutpop, setSignoutpop] = useState(false);

  const windowsize = useWindowsize();
  return ( 
    <>
      <Flex direction="column" bg="#f7f7f7" minH="100vh">
        <Flex 
          direction="column" 
          position="fixed" 
          w="full"
          align="center" 
          backgroundImage="linear-gradient(0deg, rgba(60,139,185,1) 0%, rgba(68,157,209,1) 89%)" 
          borderColor="grey.200" 
          boxShadow="0 3px 20px #aaa"
          zIndex={8}
        >
          <Flex align="center" w="full" direction="row">
          <Box minW="160px" px={6}>
            <Text fontWeight="bold" fontSize={20} color="#FDFFFC">Co-Notes</Text>
          </Box>
          {(windowsize.width < 1000) ?
            <Flex w="100%" justify="flex-end"m={2}>
              <MenuDrawer />
            </Flex>
            : <Flex justify="space-between" w="100%">
              <Box>
                <Link href="/" passHref>
                  <PseudoBox
                    as="button"
                    cursor="pointer"
                    fontWeight="semibold"
                    color="white"
                    px={4}
                    py={4}
                    mx={2}
                    ml={8}
                    _hover={{ bg: "#DDFFF7", color:"#273043" }}
                  >
                    <Text fontWeigh={15}>Your Notes</Text>
                </PseudoBox>
                </Link>
                <Link href="/newnote" passHref>
                  <PseudoBox
                    as="button"
                    cursor="pointer"
                    fontWeight="semibold"
                    color="white"
                    px={4}
                    py={4}
                    mx={2}
                    ml={8}
                    _hover={{ bg: "#DDFFF7", color:"#273043" }}
                  >
                    <Text>
                      + New Note
                    </Text>
                </PseudoBox>
                </Link>
              </Box>

              <Flex direction='row' align='center' mr={4}>
                <Flex direction="row" alignItems="center">
                  <Text color="white" fontWeight="bold" mr={1}>Signed in as {auth?.user?.displayName}</Text>
                  <IconButton icon="settings" mr={4} color="white" size="md" variant="ghost" onClick={() => setProfileVisible(!profileVisible)}/>
                </Flex>
                <PopoverSingout>
                  <PseudoBox
                    as="button"
                    color="white"
                    py={2}
                    mr={4}
                    >
                    <Box size="26px" as={MdPowerSettingsNew} />
                  </PseudoBox>
                </PopoverSingout>
              </Flex>
            </Flex>
          }
          </Flex>
          <Collapse alignSelf="" isOpen={profileVisible}>
            <UserProfile user={auth?.user} />
          </Collapse>
        </Flex>
        {profileVisible ?
        <Flex mt="20" justify="center" onClick={() => setProfileVisible(false)}>
          <Box w={["100%", "90%", "80%", "70%", "60%"]} mt={4}>
              {children}
          </Box>
        </Flex>
        :<Flex mt="20" justify="center">  
          <Box w={["100%", "90%", "80%", "70%", "60%"]} mt={4}>
            {children}
          </Box>
        </Flex>}
      </Flex>
    </>
  )

}

export default Menu