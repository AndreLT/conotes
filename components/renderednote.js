import React, { useState, useRef } from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Heading,
  List,
  ListItem,
  Spinner,
  Stack,
  Text,
  PseudoBox,
  Icon, useToast
} from "@chakra-ui/core";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { FaFilePdf } from "react-icons/fa";
import NextLink from 'next/link';
import {updateNote} from '../lib/firestore'

import PdfGen from './pdfgen';

const Renderednote = (props) => {

  const toast = useToast();

  const [preview, setPreview] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [titleEdit, setTitleEdit] = useState(props.title);
  const [cuesEdit, setCuesEdit] = useState(props.cues);
  const [notesEdit, setNotesEdit] = useState(props.notes);
  const [summaryEdit, setSummaryEdit] = useState(props.summary);

  //Cancel Edit Alert Consts
  const [isOpen, setIsOpen] = useState();
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  const listCues = (cues) => {

    return <List styleType="disc" fontSize={["14px", "16px", "18px", "20px"]} p={2}>
      {cues.trim().split('\n').map((cue, key) => (
        console.log(cue),
        <ListItem key={key}>
          {cue}
        </ListItem>
      ))}
    </List>
  }


  const handleUpdate = async () => {

    setIsSubmitting(true)

    const data = {
      title: titleEdit,
      cues: cuesEdit,
      notes: notesEdit,
      summary: summaryEdit
    }

    await updateNote(props.id, data)
    .then(
      toast({
        title: "Note Updated!",
        description: "Your note is up to date.",
        status: "success",
        duration: 5000,
        isClosable: true
      }),
    )
    .catch((error) => {
      toast({
      title: "Note Not Updated",
      description: "There was a problem updating your note, try again later.",
      status: "error",
      duration: 5000,
      isClosable: true
      }),
      console.log(error)
    })
    .finally(
      setIsSubmitting(false),
      setIsEditing(false)
    )
  }

  if (preview) {
    return (
      <>
        <PDFViewer height={["900px", "400px"]} width="100%">
          <PdfGen
            title={titleEdit}
            cues={cuesEdit}
            notes={notesEdit}
            summary={summaryEdit}
            date={props.date}
            author={props.author}
          />
        </PDFViewer>
        <Button onClick={() => setPreview(false)}>Close</Button>
      </>
    )
  }

  return (
    <Flex direction="column" opacity={isSubmitting ? "30%" : "100%"}>
      {isSubmitting ?
        <Spinner size="lg"/>
    
        :<>
          <Flex pt={2} pb={1} borderWidth="1px" align="center" justify="space-between" borderTopRightRadius={10} borderTopLeftRadius={10} borderBottomWidth="0" w="full" bg="white" direction="row">

            <Box display="flex" mx={4} alignItems="center" flexDirection="row">
              {isEditing ?
                <Flex direction="row" mb={1}>
                  <PseudoBox mr={8} cursor="pointer" onClick={() => handleUpdate()}>
                    <Icon size="25px" color="green.500" name="check" size="25px" />
                  </PseudoBox>
                  <PseudoBox mr={8} cursor="pointer">
                    <Icon size="25px" color="red.500" name="close" size="20px" onClick={() => setIsOpen(true)} />
                  </PseudoBox>

                  <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                  >
                    <AlertDialogOverlay />
                    <AlertDialogContent>
                      <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Cancel Edit?
                      </AlertDialogHeader>

                      <AlertDialogBody>
                        Any changes to de note will be lost.
                      </AlertDialogBody>

                      <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                          Close
                        </Button>
                        <Button variantColor="red"  ml={3} onClick={() => {
                          setIsEditing(false)
                          setTitleEdit(props.title)
                          setCuesEdit(props.cues);
                          setNotesEdit(props.notes);
                          setSummaryEdit(props.summary);
                          onClose
                        }}>
                          Yes
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </Flex>
                :<>
                  <NextLink href="/usernotes">
                    <PseudoBox display="flex" direction="row" align="center" color="#06D6A0" mr={8} cursor="pointer">
                      <Icon size="25px" name="arrow-back" />
                      <Text ml={2} fontWeight="600" py={1} fontSize={16}>Back to Notes</Text>
                    </PseudoBox>
                  </NextLink>
                  <PseudoBox display="flex" direction="row" cursor="pointer" align="center" color="#449DD1" mr={8} onClick={() => setIsEditing(true)}>
                    <Icon size="25px" name="edit" />
                    <Text ml={2} fontWeight="600" py={1} fontSize={16}>Edit</Text>
                  </PseudoBox>

                  <PseudoBox as="button" pl={15} onClick={() => setPreview(true)}>
                    <Text fontWeight="bold" color="#EF476F" >Preview PDF</Text>
                  </PseudoBox>
                </>
              }

              
            </Box>
            {!isEditing &&
              <PDFDownloadLink document={
                <PdfGen
                  title={props.title}
                  cues={props.cues}
                  notes={props.notes}
                  summary={props.summary}
                  date={props.date}
                  author={props.author}
                />} fileName={`${props.title.replace(/[\W]/g, '')}.pdf`}>
                {({ blob, url, loading, error }) => (<Box as={FaFilePdf} size="28px" color="#EF476F" mb={1} mx={4} isLoading={true} />)}
              </PDFDownloadLink>
            }

          </Flex>

          <Flex borderWidth="1px" direction="column" align="center" justify="center" p={5} w="full">
            <Editable
              defaultValue={titleEdit}
              isPreviewFocusable={isEditing}
              onSubmit={(e) => setTitleEdit(e)}
            >
              <Heading mb={5}>
                <EditablePreview />
                <EditableInput />
              </Heading>
            </Editable>


            <Stack w="95%" minH="500px" isInline>

              <Flex direction="column" w="50%" borderWidth="1px" p={4}>
                <Text fontSize="3xl">Cues</Text>

                <Divider />

                <Editable
                  defaultValue={cuesEdit}
                  isPreviewFocusable={isEditing}
                  onChange={(e) => setCuesEdit(e)}
                  value={listCues(cuesEdit)}
                >
                  <EditablePreview />
                  <EditableInput
                    as="textarea"
                    value={cuesEdit}
                    minH="400px"
                    onKeyDownCapture={e => { e.key == "Enter" && e.stopPropagation() }}
                  />
                </Editable>
              </Flex>

              <Flex direction="column" w="100%" borderWidth="1px" p={4}>
                <Text fontSize="3xl">Notes</Text>

                <Divider />
                <Editable
                  defaultValue={notesEdit}
                  isPreviewFocusable={isEditing}
                  onChange={(e) => setNotesEdit(e)}
                  value={notesEdit}
                  fontSize={["14px", "16px", "18px", "20px"]}
                >
                  <EditablePreview />
                  <EditableInput
                    as="textarea"
                    value={notesEdit}
                    minH="400px"
                    onKeyDownCapture={e => { e.key == "Enter" && e.stopPropagation() }}
                  />
                </Editable>

              </Flex>
            </Stack>

            <Box w="95%" borderWidth="1px" p={4} mt={2}>
              <Text fontSize="3xl">Summary</Text>

              <Divider />

              <Editable
                defaultValue={summaryEdit}
                isPreviewFocusable={isEditing}
                onChange={(e) => setSummaryEdit(e)}
                value={summaryEdit}
                fontSize={["14px", "16px", "18px", "20px"]}
              >
                <EditablePreview />
                <EditableInput
                  as="textarea"
                  value={summaryEdit}
                  minH="200px"
                  onKeyDownCapture={e => { e.key == "Enter" && e.stopPropagation() }}
                />
              </Editable>
            </Box>

          </Flex>
        </>
      }
    </Flex>
  );
}

export default Renderednote;