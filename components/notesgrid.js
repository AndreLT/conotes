import React from 'react'
import { Box, Text, Flex, SimpleGrid, Icon, Link, PseudoBox} from '@chakra-ui/core'
import { format, parseISO } from 'date-fns'
import NextLink from 'next/link'

const NotesGrid = (props) => {
  return <SimpleGrid columns={[1, 2, 3, 4]} spacing={4}>
    {props.notes.map((note) => (
      <NextLink key={note.id} href="/notes/[noteId]" as={`/notes/${note.id}`}>
        <PseudoBox cursor="pointer" bg="white" m={2} boxShadow="2px 5px 5px #ddd" borderWidth="1px" borderRadius="2px" p={2} _hover={{boxShadow:"2px 8px 5px #ddd", borderColor:"#c9d7f2" }} _active={{ bg: "#ebebeb" }}>
        <Flex w="200px" direction="column" align="center">
          <Text as="b" isTruncated>
            {note.title}
          </Text>
          <Box my={1} w="80%" h="70px">
            {(note.notes.length > 40) ?
              <Text overflow="hidden">
                {note.notes.slice(0,40) + '...'}
              </Text>
              :<Text overflow="hidden">
                {note.notes}
              </Text>
            }
          </Box>
          <Text fontSize="sm" color="#575757" mt={1}>
            {format(parseISO(note.createdAt), 'kk:mm - dd MMM yyyy')}
          </Text>
        </Flex>
        </PseudoBox>
      </NextLink>
    ))}
   <NextLink  href="/newnote">
        <PseudoBox cursor="pointer" bg="white" m={2} boxShadow="2px 5px 5px #ddd" borderWidth="1px" borderRadius="2px" p={2} _hover={{boxShadow:"2px 8px 5px #ddd", borderColor:"#c9d7f2" }} _active={{ bg: "#ebebeb" }}>
          <Flex py="5vh" justify="center">
            <Icon
              name="add"
              size="50px"
              color="#a1a1a1"
            />
        </Flex>
      </PseudoBox>
    </NextLink>
  </SimpleGrid>
}

export default NotesGrid;