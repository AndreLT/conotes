import React, {useRef, useState} from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Heading,
  useToast,
  IconButton,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from '@chakra-ui/core'

import {useAuth} from '../lib/auth'
import PopoverSignout from '../utils/popoversignout'
import {deleteUser} from '../lib/firestore'

const UserProfile = ({ user }) => {

  const auth = useAuth();
  
  //Signout popover consts
  const initialFocusRef = useRef();
  const [newName, setNewName] = useState(null);
  const toast = useToast();

  //Account Delete Consts
  const [isOpen, setIsOpen] = React.useState();
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const popRename = (props) => {
    return (<Popover
      initialFocusRef={initialFocusRef}
      placement="bottom"
    >
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger>
            {props}
          </PopoverTrigger>
          <PopoverContent
            ml={-10}
            mr={2}
            zIndex={4}
            bg="#fff"
            borderWidth="3px"
            borderColor="#3C8BB9"
            color="black"
          >
            <PopoverArrow bg="#3C8BB9" />
            <PopoverCloseButton />
            <PopoverHeader fontWeight="bold">New display name</PopoverHeader>
            <PopoverBody>
              <Text>How do you want to be called?</Text>
              <Input 
                placeholder={user?.displayName}
                value={newName}
                onChange={(e)=> {setNewName(e.target.value), console.log(e.target.value)}}
              />
            </PopoverBody>
            <PopoverFooter>
              <ButtonGroup>
                <Button variantColor="green" onClick={() => {
                  auth.updateUserInfo({displayName: newName})
                  .then(
                    toast({
                      title: "Success.",
                      description: `Your display name is ${newName}!`,
                      status: "success",
                      duration: 5000,
                      isClosable: true
                    })
                  ).catch((error) => {
                    toast({
                    title: "Failed",
                    description: "There was a problem changing your name, try again later.",
                    status: "error",
                    duration: 5000,
                    isClosable: true
                    }),
                    console.log(error)
                  })
                }}>Submit</Button>
                <Button onClick={onClose} ref={initialFocusRef}>Cancel</Button>
              </ButtonGroup>
            </PopoverFooter>
          </PopoverContent>
        </>
      )}
    </Popover>)
  }

  const alertDelete = () => {


    return(
      <>
      <Button color="#dF041D" variant="link" onClick={() => setIsOpen(true)}>Delete Account</Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Account?
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button variantColor="red"  ml={3} onClick={() => deleteUser(user.uid).then(console.log("account deleted")).catch((error) => {console.log(error)})}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
    );
  }

  return (
    <Flex align="center" w="77vw" margin={4} direction="row" justify="space-between">
      <Box color="white">
        <Flex direction="row">
          <Heading size="md">
            {user?.displayName}
          </Heading>
          {popRename(<IconButton variant="link" outline="none" size="lg" icon="edit" color="white"/>)}
        </Flex>
        <Text mt={2} ml={1}>{user?.email}</Text>
      </Box>
      <Divider h="13vh" orientation="vertical" borderColor="white" />
      <Flex direction="column" align="center">
        <Heading color="white">{user?.notes}</Heading>
        <Text color="white"> Your Notes </Text>
      </Flex>
      <Divider h="13vh" orientation="vertical" borderColor="white" />
      <Flex  align="flex-end" direction="column">

          <Button mb={2} color="white" variant="link">Reset Password</Button>

          {popRename(<Button mb={2} color="white" variant="link">Edit Profile Name</Button>)}
          
          <PopoverSignout>
            <Button mb={2} color="white" variant="link">Sign Out</Button>
          </PopoverSignout>

          {alertDelete()}

      </Flex>
    </Flex>
  )
}

export default UserProfile;