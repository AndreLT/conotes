import React, {useState} from 'react'
import {Box, Button, Input, Stack, Text, Textarea, Flex } from '@chakra-ui/core'

import {createNote} from '../lib/firestore'
import Renderednote from './renderednote'
import {useAuth} from '../lib/auth'
const Note = () => {

  const [title, setTitle] = useState("")
  const [cues, setCues] = useState("")
  const [notes, setNotes] = useState("")
  const [summary, setSummary] = useState("")
  const [rendered, setRendered] = useState(false)

  const auth = useAuth();

  const pushNote = () => {
    let data = {
      title: title,
      cues: cues,
      notes: notes, 
      summary: summary
    }

    createNote(auth.user.uid, data)
    .then(console.log("added note to db"))
    .catch(function(error) {console.log(error)})
  }

  return <Flex direction="column" align="center" justify="center">
    <Box w="80%" maxW="800px" p={5} borderWidth="1px" borderColor="grey.300" rounded="10px">
      {rendered ?
        <Renderednote title={title} cues={cues} notes={notes} summary={summary} />
        :<Box>
          <Text >Note Title</Text>
          <Input 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Stack isInline>
            <Flex direction="column" w="70%">
              <Text>Cues</Text>
              <Textarea 
                value={cues}
                onChange={(e) => setCues(e.target.value)}
              />
            </Flex>
            <Flex direction="column" w="100%">
              <Text>Notes</Text>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Flex>
          </Stack>
          <Text>Summary</Text>
          <Textarea 
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </Box>
      }
      
    </Box>
    <Button onClick={() => setRendered(true)}>Render</Button>
    <Button onClick={() => pushNote()}>Save Note</Button>
  </Flex>
}

export default Note;

const formattedData = (title,cues,notes,summary) => {
  return {
    title: title,
    cues: cues,
    notes: notes,
    summary: summary
  }
}