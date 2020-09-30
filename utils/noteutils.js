import React from 'react';
import Router from 'next/router'
import {useToast} from '@chakra-ui/core'
import {mutate} from 'swr'

import { createNote, updateNote } from '../lib/firestore';
import {useAuth} from '../lib/auth'


export function NewNote(user, data){

    const toast = useToast();
    
    mutate('/api/notes', createNote(data))
    .then(
      toast({
        title: "Note Created",
        description: "The note has been added to Your Notes!.",
        status: "success",
        duration: 5000,
        isClosable: true
      }),
      ['author','title','cues','notes','summary']
        .forEach((key) => window.localStorage.removeItem(key)),
      user.notes++,
      Router.push('/')
    )
    .catch((error) => {
      toast({
        title: "Note could not be created",
        description: "There was a problem creating your note, try again later.",
        status: "error",
        duration: 5000,
        isClosable: true
      }),
      console.log(error)
    })
}

export function UpdateNote(user, data){

    const toast = useToast();

    mutate('/api/notes', updateNote(data))
    .then(
      toast({
        title: "Note Created.",
        description: "The note has been added to Your Notes!.",
        status: "success",
        duration: 5000,
        isClosable: true
      }),
      ['author','title','cues','notes','summary']
        .forEach((key) => window.localStorage.removeItem(key)),
      user.notes++,
      Router.push('/')
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