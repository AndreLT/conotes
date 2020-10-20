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

const UserProfile = (props) => {

  const auth = useAuth();
  
  //Signout popover consts
  const initialFocusRef = useRef();
  const [newName, setNewName] = useState("");
  const toast = useToast();

  //Account Delete Consts
  const [isOpen, setIsOpen] = useState();
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();
  const [finalAlert, setFinalAlert] = useState(false);

  const fontColor = props.menu == "standart" ? "white" : "black"

  const menuDivider = () => {
    if(props.menu == "standart")
      return <Divider h="13vh" orientation="vertical" borderColor="white" />

    return <Divider orientation="horizontal" my={4} w="100%" borderColor="black" />
  }

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
                placeholder={auth?.user?.displayName}
                value={newName}
                onChange={(e)=> setNewName(e.target.value)}
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
            {finalAlert ? 
              "All your notes will be deleted with your account and cannot be restored \n Do you want to proceed?"
              :"Are you sure? You can't undo this action afterwards."
            }
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={() => setFinalAlert(false), onClose}>
              Cancel
            </Button>
            {finalAlert ?
              <Button variantColor="red"  ml={3} onClick={() => deleteUser(auth.user.uid)}>
                Delete
              </Button>
              :<Button variantColor="red"  ml={3} onClick={() => setFinalAlert(true)}>
                Yes
              </Button>
            }
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
    );
  }

  const resetEmail = (email) => {
    resetPassword(email)
    .then((response) => {
      toast({
        title: "Success.",
        description: `The link to reset your password has been sent to ${email}`,
        status: "success",
        duration: 5000,
        isClosable: true
      })
    }).catch((error) => {
      toast({
      title: "Failed",
      description: "There was a problem sending a reset email, try again later.",
      status: "error",
      duration: 5000,
      isClosable: true
      }),
      console.log(error)
    })
  }

  return (
    <Flex align="center" w={props.menu == "drawer" ? "20vh" : "77vh"} color={fontColor} margin={4} direction={props.menu == "drawer" ? "column" : "row"} justify="space-between">
      <Box color={fontColor}>
        <Flex direction="row">
          <Heading size="md">
            {auth?.user?.displayName}
          </Heading>
          {popRename(<IconButton variant="link" outline="none" size="lg" icon="edit" color={fontColor}/>)}
        </Flex>
        <Text mt={2} ml={1}>{auth?.user?.email}</Text>
      </Box>
      {menuDivider()}
      <Flex direction="column" align="center">
        <Heading color={fontColor}>{auth?.user?.notes}</Heading>
        <Text color={fontColor}> Your Notes </Text>
      </Flex>
      {menuDivider()}
      <Flex  align={props.menu == "standart" ? "flex-end" : "flex-start"} direction="column">

          <Button mb={2} color={fontColor} variant="link" onClick={()=> auth.resetEmail(auth?.user?.email)}>Reset Password</Button>

          {popRename(<Button mb={2} color={fontColor} variant="link">Edit Profile Name</Button>)}
          
          <PopoverSignout>
            <Button mb={2} color={fontColor} variant="link">Sign Out</Button>
          </PopoverSignout>

          {alertDelete()}

      </Flex>
    </Flex>
  )
}

export default UserProfile;