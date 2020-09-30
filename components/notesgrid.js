import React, { useState, useRef } from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Icon,
  PseudoBox,
  SimpleGrid,
  Text,
} from "@chakra-ui/core";
import { format, parseISO } from 'date-fns'
import styled from '@emotion/styled'
import { mutate } from 'swr'
import NextLink from 'next/link'
import { jsx, css, keyframes } from '@emotion/core'

import { deleteNote } from '../lib/firestore'
import { useAuth } from '../lib/auth'

const NotesGrid = (props) => {

  const auth = useAuth();

  const [mouseOver, setMouseOver] = useState(null);
  const [deletee, setDeletee] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef();


  const onClose = () => setIsOpen(false);
  const onDelete = () => {
    deleteNote(deletee);
    auth.updateLocalInfo({ notes: auth.user.notes + 1 })
    onClose();
  }

  const bounce = keyframes`
    from {
      transform: translate(0,20px);
    }

    to {
      transform: translate(0, 0);
    }
  `

  const DelButton = styled.div`
    z-index: -1;
    position: absolute;
    animation: ${bounce} 0.1s cubic-bezier(0.1, 0.8, 0.9, 1.0);
  `

  return <Flex justify="center">
    <SimpleGrid columns={[1, 2, 3, 4]} spacing={8}>
      {props.isFirst &&
        <NextLink href="/newnote">
          <PseudoBox
            bg="rgba(180,180,180,.2)"
            borderRadius="1px"
            borderWidth="1px"
            borderColor="#f7f7f7"
            boxShadow="4px 4px 15px 4px #ccc inset"
            cursor="pointer"
            minH="260px"
            mt={6}
            p={2}
            transition="box-shadow 0.1s ease-in-out, background-color 0.1s ease-in-out"
            _active={{ bg: "#ebebeb" }}
            _hover={{ boxShadow: "0 0 0 #ddd inset", borderColor: "#c9d7f2" }}
          >
            <Flex h="100%" py="5vh" align="center" justify="center">
              <Icon
                name="add"
                size="50px"
                color="#a1a1a1"
              />
            </Flex>
          </PseudoBox>
        </NextLink>
      }

      {props.notes.map((note) => (
        <PseudoBox key={note.id} mt={2} zIndex="1" onMouseOver={() => setMouseOver(note.id)} cursor="pointer">

          {mouseOver == note.id &&
            <DelButton>
              <PseudoBox p={1} pb={1} mt={-5} borderRadius={8} onClick={() => { setIsOpen(true); setDeletee(note.id) }}>
                <Icon size="20px" name="delete" color="red.400" />
              </PseudoBox>
            </DelButton>
          }

          <NextLink key={note.id} href="/notes/[noteId]" as={`/notes/${note.id}`}>
            <PseudoBox
              minH="260px"
              mt={4}
              w="210px"
              bg="#f7f7f7"
              boxShadow="5px 5px 15px 4px #ddd"
              borderWidth="1px"
              borderRadius="2px"
              p={2}
              transition="box-shadow 0.1s ease-in-out, background-color 0.1s ease-in-out"
              _hover={{ boxShadow: "5px 5px 10px #ccc", backgroundColor: "#dbe9ff", borderColor: "#c9d7f2" }}
              _active={{ bg: "#ebebeb" }}
            >
              <Flex bg="white" borderWidth="1px" minH="250px" direction="column" justify="space-between" align="center">

                <Flex alignItems="center" textAlign="center" m={1} boxShadow="0 4px 7px -2px #ccc" h="65px" w="100%">
                  <Text w="100%" mx={1} overflow="hidden">
                    {(note.title.length > 30) ?
                      note.title.slice(0, 30) + '...'
                      : note.title
                    }
                  </Text>
                </Flex>

                <Box flexGrow="2" mt={2} justifySelf="flex-start" w="90%" h="70px">
                  <Text overflow="hidden">
                    {(note.notes.length > 100) ?
                      note.notes.slice(0, 100) + '...'
                      : note.notes
                    }
                  </Text>
                </Box>

                <Box textAlign="center" borderWidth="1px" w="100%">
                  <Text fontSize="sm" color="#a1a1a1" >
                    {format(parseISO(note.createdAt), 'kk:mm - dd MMM yyyy')}
                  </Text>
                </Box>

              </Flex>
            </PseudoBox>
          </NextLink>

        </PseudoBox>
      ))}

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>

          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Note
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button variantColor="red" ml={3} onClick={() => onDelete()}
            >
              Delete
            </Button>
          </AlertDialogFooter>

        </AlertDialogContent>
      </AlertDialog>
    </SimpleGrid>
  </Flex>
}

export default NotesGrid;