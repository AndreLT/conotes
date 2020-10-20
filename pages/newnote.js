import React, {useState} from 'react'
import {
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Input,
  Text,
  Textarea,
  useToast,
  Skeleton
} from '@chakra-ui/core'
import Router from 'next/router';
import {mutate} from 'swr'

import useLocalStorage from '../utils/uselocalstorage'
import {createNote} from '../lib/firestore'
import {useAuth} from '../lib/auth'
import Menu from '../components/menu'

const NewNote = () => {

  const [author, setAuthor] = useLocalStorage('author', null)
  const [title, setTitle] = useLocalStorage('title', "")
  const [cues, setCues] = useLocalStorage('cues', "")
  const [notes, setNotes] = useLocalStorage('notes', "")
  const [summary, setSummary] = useLocalStorage('summary',"")

  const [isSubmitting, setIsSubmitting] = useState(false);

  const auth = useAuth();
  
  const date = new Intl.DateTimeFormat('en',{year: 'numeric', month: 'long', day: 'numeric'}).format(new Date());

  const toast = useToast();

  const pushNote = () => {
    let data = {
      userId: auth.user.uid,
      createdAt: new Date().toISOString(),
      author: author,
      title: title,
      cues: cues,
      notes: notes, 
      summary: summary
    }

    mutate('/api/notes', createNote(data))
    .then(
      toast({
        title: "Note Created.",
        description: "The note has been added to Your Notes!.",
        status: "success",
        duration: 5000,
        isClosable: true
      }),
      ['author','title','cues','notes','summary']
        .forEach((key) => localStorage.removeItem(key)),
      auth.user.notes++,
      Router.push('/')
    )
    .catch((error) => {
      toast({
      title: "Note not created",
      description: "There was a problem creating your note, try again later.",
      status: "error",
      duration: 5000,
      isClosable: true
      }),
      console.log(error)
    })
  }

  

  return <Menu>
    <Flex direction="column">
      <Flex p={2} borderWidth="1px" align="center" justify="space-between" borderTopRightRadius={10} borderTopLeftRadius={10} borderBottomWidth="0" w="full" bg="white" direction="row">
        <Button onClick={() => {
          setIsSubmitting(true)
          pushNote()
        }} isLoading={!auth?.user} isDisabled={isSubmitting}>Save Note</Button>
      </Flex>

      <Flex p={4} w="full" borderWidth="1px" alignItems="center" direction="column">
        <Text alignSelf="flex-start" fontSize='xl'>Note Title</Text>
        <Input 
          value={title}
          alignSelf="flex-start"
          onChange={(e) => {
            localStorage.setItem('title', e.target.value);
            setTitle(e.target.value);
            }
          }
        />

        <Flex direction='row' w="100%" justify='space-between' my={2}>

          <Text>{date}</Text>

          <Box display="flex" direction="row">
            <Text mr={2}>Author:</Text>
            {auth?.user ?
            <Editable 
              value={author}
              name='author'
              onChange={(e) => {
                localStorage.setItem('author', e);
                setAuthor(e);
                }
              }
              defaultValue={() => {
                setAuthor(auth.user.displayName);
                return auth.user.displayName;
              }}
            >
              <EditablePreview borderWidth="1px" borderRadius={5}>
                {auth.user.displayName}
              </EditablePreview>

              <EditableInput/>
            </Editable>

            :<Skeleton>
              <Text>Loading</Text>
            </Skeleton>}  
          </Box>
        </Flex>

        <Flex direction="row" w="full" resize="vertical">

          <Flex direction="column" w="50%" mr={2}>
            <Text>Cues</Text>
            <Textarea 
              value={cues}
              h="40vh" 
              resize="none"
              name='cues'
              rows="20"
              onChange={(e) => {
                localStorage.setItem('cues', e.target.value);
                setCues(e.target.value);
                }
              }
              fontSize={["12px", "16px"]}
            />
          </Flex>

          <Flex direction="column" w="100%">
            <Text>Notes</Text>
            <Textarea
            value={notes}
            resize="none"
            name='notes'
            h="40vh" 
            rows="20"
            onChange={(e) => {
              localStorage.setItem('notes', e.target.value);
              setNotes(e.target.value);
              }
            }
            />
          </Flex>

        </Flex>

        <Text>Summary</Text>
        <Textarea 
          h="15vh"
          value={summary}
          name='summary'
          onChange={(e) => {
            localStorage.setItem('summary', e.target.value);
            setSummary(e.target.value);
          }}
        />

      </Flex>
    </Flex>
  </Menu>
}

export default NewNote;