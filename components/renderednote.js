import React from 'react'
import { Box, Flex, Heading, List, ListItem, Divider, Text, Stack} from '@chakra-ui/core'
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfGen from './pdfgen';

const Renderednote = (props) => {
    return <Flex direction="column" align="center" justify="center" borderWidth="1px" borderColor="grey.400" p={5} w="full">
      <Heading mb={5}>{props.title}</Heading>
      <Stack w="95%" minH="500px" isInline>
        <Flex direction="column" w="50%" borderWidth="1px" p={4}>
          <Text fontSize="3xl">Cues</Text>
          <Divider />
          <List styleType="disc" fontSize={["14px","16px","18px", "20px"]} p={2}>
            {props.cues.trim().split('\n').map((cue) => (
              <ListItem>{cue}</ListItem>
            ))}
          </List>
        </Flex>
        <Flex direction="column" w="100%" borderWidth="1px" p={4}>
          <Text fontSize="3xl">Notes</Text>
          <Divider />
          <Text p={2} fontSize={["14px","16px","18px", "20px"]}>
            {props.notes}
          </Text>
        </Flex>
      </Stack>
      <Box w="95%" borderWidth="1px" p={4} mt={2}>
        <Text fontSize="3xl">Summary</Text>
        <Divider />
        <Text fontSize={["14px","16px","18px", "20px"]} p={2}>{props.summary}</Text>
      </Box>
      <PDFDownloadLink document={
        <PdfGen 
          title = {props.title}
          cues = {props.cues}
          notes = {props.notes}
          summary = {props.summary}
          date = {props.date}
        />} fileName={`${props.title.replace(/[\W]/g,'')}.pdf`}>
        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
      </PDFDownloadLink>
    </Flex>
}

export default Renderednote;