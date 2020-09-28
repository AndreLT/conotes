import React, {useState} from 'react'
import {
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Input,
  Stack,
  Text,
  Textarea,
  useToast,
  Skeleton
} from '@chakra-ui/core'
import Router from 'next/router';
import {mutate} from 'swr'

import useLocalStorage from '../utils/uselocalstorage'
import {createNote} from '../lib/firestore'
import Renderednote from '../components/renderednote'
import {useAuth} from '../lib/auth'
import Menu from '../components/menu'

const NewNote = () => {

  const [author, setAuthor] = useLocalStorage('author', null)
  const [title, setTitle] = useLocalStorage('title', "")
  const [cues, setCues] = useLocalStorage('cues', "")
  const [notes, setNotes] = useLocalStorage('notes', "")
  const [summary, setSummary] = useLocalStorage('summary',"")
  const [rendered, setRendered] = useState(false)

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
    <Flex direction="column" align="center" justify="center">
      <Box w="80%" maxW="800px" p={5} borderWidth="1px" borderColor="grey.300" rounded="10px">
        {rendered ?
          <Renderednote title={title} cues={cues} notes={notes} summary={summary} author={author} date={date}/>
          :<Box>

            <Text fontSize='xl'>Note Title</Text>
            <Input 
              value={title}
              onChange={(e) => {
                localStorage.setItem('title', e.target.value);
                setTitle(e.target.value);
                }
              }
            />

            <Flex direction='row' justify='space-between' my={2}>
              <Text>{date}</Text>
              <Flex direction='row'>
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
              </Flex>
            </Flex>

            <Flex direction="row" resize="vertical">

              <Flex direction="column" w="50%" mr={2}>
                <Text>Cues</Text>
                <Textarea 
                  value={cues}
                  resize="none"
                  name='cues'
                  rows="20"
                  minH="300px"
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
                maxH="500px"
                rows="20"
                minH="300px"
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
            value={summary}
            name='summary'
            onChange={(e) => {
              localStorage.setItem('summary', e.target.value);
              setSummary(e.target.value);
              }
            }
            />

          </Box>
        }
      </Box>

      <Stack mt={2}isInline>
        <Button onClick={() => setRendered(true)} isLoading={!auth?.user}>Render</Button>
        <Button onClick={() => {
          setIsSubmitting(true)
          pushNote()
        }} isLoading={!auth?.user} isDisabled={isSubmitting}>Save Note</Button>
      </Stack>

    </Flex>
  </Menu>
}

export default NewNote;