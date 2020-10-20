import React, { useRef, useState} from 'react'
import {
    Collapse,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    IconButton,
    useDisclosure,
    Button, 
    Text,
    PseudoBox,
    Flex
  } from "@chakra-ui/core";
import {HiOutlineMenu} from 'react-icons/hi'
import Link from 'next/link';
import { useAuth } from '../lib/auth';
import UserProfile from './userprofile'

const MenuDrawer = () => {

    const auth = useAuth();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();
    
    const [profileVisible, setProfileVisible] = useState(false);
  
    return (
      <Flex>
        <IconButton 
            ref={btnRef} 
            icon={HiOutlineMenu}
            onClick={onOpen}
            fontSize="30px"
            variant="ghost"
            color="white"
        />
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
          size="300px"
        >
          <DrawerContent>
            <DrawerCloseButton size={6} m={2} />
            <DrawerBody>
              <Flex flexDirection="column" align="center" mt={10}>
                <Link href="/usernotes" passHref>
                  <PseudoBox
                    as="button"
                    cursor="pointer"
                    fontWeight="bold"
                    color="black"
                    borderRadius="50px"
                    boxShadow=  "2px 2px 3px #ccc"
                    borderWidth="1px"
                    w="full"
                    py={2}
                    my={2}
                  >
                    <Text>Your Notes</Text>
                </PseudoBox>
                </Link>
                <Link href="/newnote" passHref>
                  <PseudoBox
                    as="button"
                    cursor="pointer"
                    fontWeight="bold"
                    color="black"
                    borderRadius="50px"
                    boxShadow=  "2px 2px 3px #ccc"
                    borderWidth="1px"
                    w="full"
                    py={2}
                    my={2}
                  >
                    <Text>+ New Note</Text>
                </PseudoBox>
                </Link>
                <PseudoBox
                  as="button"
                  cursor="pointer"
                  fontWeight="bold"
                  color="black"
                  borderRadius="50px"
                  boxShadow=  "2px 2px 3px #ccc"
                  borderWidth="1px"
                  onClick={()=>setProfileVisible(!profileVisible)}
                  w="full"
                  py={2}
                  my={2}
                >
                  <Flex direction="column" align="center">
                    <Text>Profile</Text>
                    <Collapse my={10} isOpen={profileVisible}>
                      <UserProfile menu="drawer" />
                    </Collapse>
                  </Flex>
                </PseudoBox>
              </Flex>
            </DrawerBody>
  
          </DrawerContent>
        </Drawer>
      </Flex>
    );
  }

export default MenuDrawer;