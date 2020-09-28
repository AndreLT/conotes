import React, {useState} from 'react'
import { 
  Box, 
  Button,
  Divider, 
  Flex, 
  Heading, 
  IconButton,
  List, 
  ListItem,
  Stack,
  Text,
  PseudoBox,
  Icon
} from "@chakra-ui/core";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { GrDocumentPdf } from "react-icons/gr";
import { FaFilePdf } from "react-icons/fa";

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
            author = {props.author}
            />
        </PDFViewer>  
        <Button onClick={() => setPreview(false)}>Close</Button>
      </>
    )
  }
  return (
    <>
      <Flex pt={2} pb={1} borderWidth="1px" align="center" justify="space-between" borderTopRightRadius={10} borderTopLeftRadius={10} borderBottomWidth="0" w="full" bg="white" direction="row">
        
        <Box display="flex" mx={4} alignItems="center" flexDirection="row">
          <PseudoBox display="flex" direction="row" align="center" color="#449DD1" mr={8}>
            <Icon size="25px" name="edit"/>
            <Text ml={2} fontWeight="600" py={1} fontSize={16}>Edit</Text>
          </PseudoBox>
      
          <PseudoBox as="button" pl={15} onClick={() => setPreview(true)}>
            <Text fontWeight="bold" color="#449DD1" >Preview PDF</Text>
          </PseudoBox>
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
          {({ blob, url, loading, error }) => (<Box as={FaFilePdf} size="28px" color="#F00" mb={1} mx={4} isLoading={true}/> )}
        </PDFDownloadLink>
        
      
      </Flex>

      <Flex  borderWidth="1px" direction="column" align="center" justify="center" p={5} w="full">
        
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

      </Flex> 
    </>
  );
}

export default Renderednote;