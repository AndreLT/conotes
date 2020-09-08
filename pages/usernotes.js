import React from 'react';
import useSWR from 'swr';
import { Box, Spinner, Text, Heading } from '@chakra-ui/core';

import fetcher from '../utils/fetcher';
import Menu from '../components/menu';
import { useAuth } from '../lib/auth';
import NotesGrid from '../components/notesgrid';

const UserNotes = () => {
    const { user }  = useAuth();
    const {data} = useSWR( user ? ['/api/notes', user.token] : null, fetcher)

    if(!data){
        return(
            <Menu>
                <Spinner/>
            </Menu>   
        )
    }

    return (
        <Menu>
            {data?
                <NotesGrid notes={data.notes}/>
                :
                <Text>You dont have any notes yet!</Text>
            }
        </Menu>
    )
}

export default UserNotes;