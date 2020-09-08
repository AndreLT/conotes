import React from 'react'
import { Box, Text, Flex, Icon, Link, PseudoBox} from '@chakra-ui/core'
import { format, parseISO } from 'date-fns'
import NextLink from 'next/link'

const NotesGrid = (props) => {
  return <Flex wrap="wrap" flexDirection="row" justify="center">
    {props.notes.map((note) => (
      <NextLink key={note.id} href="/notes/[noteId]" as={`/notes/${note.id}`}>
        <PseudoBox cursor="pointer" m={2} borderWidth="1px" borderRadius="10px" p={2} _hover={{boxShadow:"md", borderColor:"#c9d7f2" }} _active={{ bg: "#ebebeb" }}>
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
    <Link href="/newnote">
      <PseudoBox cursor="pointer" bg="#ededed" m={2} mb={8} borderWidth="1px" borderRadius="10px" p={2} _hover={{boxShadow:"md", borderColor:"#c9d7f2" }} _active={{ bg: "#ebebeb" }}>
        <Flex align="center" w="200px" h="120px" justify="center"  >
            <Icon
              name="add"
              size="50px"
              color="#a1a1a1"
            />
        </Flex>
      </PseudoBox>
    </Link>
  </Flex>
}

export default NotesGrid;