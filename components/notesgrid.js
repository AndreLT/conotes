import React from 'react'
import { Box,Button, Text, Flex, Icon, Link} from '@chakra-ui/core'
import { format, parseISO } from 'date-fns'

const NotesGrid = (props) => {
  return <Flex wrap="wrap" flexDirection="row">
    {props.notes.map((note) => (
      <Flex key={note.id} w="200px" direction="column" m={2} borderWidth="1px" borderRadius="10px" p={2}>
        <Text as="b" isTruncated>
          {note.title}
        </Text>
        <Box my={1} w="80%" bg="tomato" h="70px">
          <Text isTruncated>{note.notes}</Text>
        </Box>
        <Text mt={1}>
          {format(parseISO(note.createdAt), 'kk:mm - dd MMM yyyy')}
        </Text>
      </Flex>
    ))}
    <Flex align="center" w="200px" m={2} justify="center" bg="#ededed" borderWidth="1px" borderRadius="10px" p={2}>
      <Link href="/newnote">
        <Icon
          name="add"
          size="50px"
          color="#a1a1a1"
        />
      </Link>
    </Flex>
  </Flex>
}

export default NotesGrid;