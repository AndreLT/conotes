import React from 'react'
import { Box, Flex, Heading, List, ListItem, Divider, Text, Stack} from '@chakra-ui/core'

const Renderednote = (props) => {
    return <Box borderWidth="1px" borderColor="grey.400" p={5}>
    <Flex direction="column" align="center" justify="center">
    
      <Heading mb={5}>{props.title}</Heading>
      <Stack isInline>
        <Flex direction="column" w="70%">
          <Text fontSize="3xl">Cues</Text>
          <Divider />
          <List styleType="disc">
            {props.cues.split('\n').map((cue) => (
              <ListItem>{cue}</ListItem>
            ))}
          </List>
        </Flex>
        <Divider orientation="vertical" />
        <Flex direction="column" w="100%">
          <Text fontSize="3xl">Notes</Text>
          <Divider />
          <Text>
            {props.notes}
          </Text>
        </Flex>
      </Stack>
      <Divider borderWidth="2px"/>
      <Text fontSize="3xl">Summary</Text>
      <Text>{props.summary}</Text>
    </Flex>
  </Box>
}

export default Renderednote;