import React, {useState, useEffect} from 'react';
import {
    Button,
    ButtonGroup,
    Flex,
    Spinner,
    Text
} from '@chakra-ui/core';
import { mutate } from 'swr';

import Menu from './menu'
import { useAuth } from '../lib/auth';
import fetcher from '../utils/fetcher'
import NotesGrid from './notesgrid'

const Pagination = (props) => {

    const [pageIndex, setPageIndex] = useState(0);
    const [loadedindex, setLoadedindex] = useState(0);
    const [notes, setNotes] = useState(props.notes);
    const [isLoading, setIsLoading] = useState(false);

    const {user} = useAuth();

    const handlePagination = (index) => {
        setPageIndex(pageIndex + index)
        if((pageIndex + index) > loadedindex){
            setLoadedindex(loadedindex + 1)
            setIsLoading(true);
            mutate('/api/notes', async () => {
                const newNotes = await fetcher(`/api/notes?last=${notes[notes.length -1].id}&limit=${props.limit}`, user.token)
                console.log(newNotes)
                return [...notes, ...newNotes.notes]
            }).then((res) => {
                setNotes(res)
                setIsLoading(false)
            })
            
        }
    }

    if(!user || !notes || isLoading){
        return(<Spinner />)
    }

    return (
        <Flex direction='column'>
            <Text>You have: {user.notes} notes</Text>
            <NotesGrid limit={props.limit} notes={notes.slice(pageIndex*props.limit, (pageIndex*props.limit) + props.limit)}/>
            <ButtonGroup>
            <Button onClick={() => handlePagination(-1)} isDisabled={pageIndex === 0}>Previous</Button>
            <Button onClick={() => handlePagination(1)} isDisabled={pageIndex == loadedindex && notes.length >= user.notes}>Next</Button>
            </ButtonGroup>
        </Flex>
    )
}
  
export default Pagination;