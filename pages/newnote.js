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

import {createNote} from '../lib/firestore'
import Renderednote from '../components/renderednote'
import {useAuth} from '../lib/auth'
import Menu from '../components/menu'
import {mutate} from 'swr'

const NewNote = () => {
  
  const auth = useAuth();

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
    
    createNote(data)
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
      mutate('/api/notes'),
      Router.push('/usernotes')
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

  const [author, setAuthor] = useLocalStorage('author', auth?.user?.displayName)
  const [title, setTitle] = useLocalStorage('title', "")
  const [cues, setCues] = useLocalStorage('cues', "")
  const [notes, setNotes] = useLocalStorage('notes', "")
  const [summary, setSummary] = useLocalStorage('summary',"")
  const [rendered, setRendered] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const date = new Intl.DateTimeFormat('en',{year: 'numeric', month: 'long', day: 'numeric'}).format(new Date());

  
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
                {auth?.user?.displayName ?
                  <Editable 
                    value={author}
                    name='author'
                    onChange={(e) => {
                      localStorage.setItem('author', e);
                      setAuthor(e);
                      }
                    }
                    defaultValue={auth?.user?.displayName}
                  >
                    <EditablePreview borderWidth="1px" borderRadius={5}>
                      {auth.user.displayName}
                    </EditablePreview>
                  
                    <EditableInput/>
                  </Editable>
                  :<Skeleton>
                    <Text>Username</Text>
                  </Skeleton>
                }
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
        <Button onClick={() => setRendered(true)}>Render</Button>
        <Button onClick={() => {
          setIsSubmitting(true)
          pushNote()
        }} isDisabled={isSubmitting}>Save Note</Button>
      </Stack>

    </Flex>
  </Menu>
}

const useLocalStorage = (key, initialValue) => {

  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = typeof window !== 'undefined' ? window.localStorage.getItem(key) : false;
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }

  });

  const setValue = value => {

    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export default NewNote;