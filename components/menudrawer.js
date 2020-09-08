import React, {useRef} from 'react'
import {
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

const MenuDrawer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();
  
    return (
      <>
        <IconButton 
            ref={btnRef} 
            icon={HiOutlineMenu}
            onClick={onOpen}
            fontSize="30px"
            variant="ghost"
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
              <Flex flexDirection="column" mt={10}>
                <Link href="/usernotes" passHref>
                  <PseudoBox
                  as="button"
                  cursor="pointer"
                  fontWeight="semibold"
                  py={4}
                  bg="white"
                  >
                      Your Notes
                  </PseudoBox>
                </Link>
                <Link href="/newnote" passHref>
                  <PseudoBox
                    as="button"
                    cursor="pointer"
                    fontWeight="semibold"
                    py={4}
                    bg="#deebff"
                    _hover={{ bg: "#adceff" }}
                    >
                    + New Note
                  </PseudoBox>
                </Link>
              </Flex>
            </DrawerBody>
  
          </DrawerContent>
        </Drawer>
      </>
    );
  }

export default MenuDrawer;