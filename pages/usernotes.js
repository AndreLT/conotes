import React from 'react';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import { Box, Spinner, Text, Heading } from '@chakra-ui/core';
import Menu from '../components/menu'

const UserNotes = () => {
    const {data} = useSWR('/api/notes', fetcher)
    
    if(!data){
        return(
            <Menu>
                <Spinner/>
            </Menu>   
        )
    }

    return (
        <Menu>
            {data.notes?
                data.notes.map((note) => (
                    <Heading>{note.title}</Heading>
                    
                ))
                :
                <Text>You dont have any notes yet!</Text>
            }
        </Menu>
    )
}

export default UserNotes;