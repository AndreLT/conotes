import React, {useState} from 'react'
import { 
  Box, 
  Button,
  Divider, 
  Flex, 
  Heading, 
  List, 
  ListItem,
  Stack,
  Text
} from "@chakra-ui/core";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";

import PdfGen from './pdfgen';

const Renderednote = (props) => {

  const [preview, setPreview] = useState(false);

  if(preview){
    return(
      <>
        <PDFViewer height={["900px", "400px"]} width="100%">
          <PdfGen
            title = {props.title}
            cues = {props.cues}
            notes = {props.notes}
            summary = {props.summary}
            date = {props.date}
            autho = {props.author}
            />
        </PDFViewer>  
        <Button onClick={() => setPreview(false)}>Close</Button>
      </>
    )
  }
  return (
    <>
      <Flex direction="column" align="center" justify="center" p={5} w="full">
        <Heading mb={5}>{props.title}</Heading>

        <Stack w="95%" minH="500px" isInline>
          <Flex direction="column" w="50%" borderWidth="1px" p={4}>
            <Text fontSize="3xl">Cues</Text>
            <Divider />
            <List styleType="disc" fontSize={["14px","16px","18px", "20px"]} p={2}>
              {props.cues.trim().split('\n').map((cue, key) => (
                <ListItem key={key}>{cue}</ListItem>
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
            author = {props.author}
          />} fileName={`${props.title.replace(/[\W]/g,'')}.pdf`}>
          {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
        </PDFDownloadLink>
        <Button onClick={() => setPreview(true)}>Preview</Button>
      </Flex> 
    </>
  );
}

export default Renderednote;