import React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Text } from '@chakra-ui/core';
import { format, parseISO } from 'date-fns'

import fetcher from '../../utils/fetcher'
import { useAuth } from '../../lib/auth';
import Renderednote from '../../components/renderednote'
import Menu from '../../components/menu'

const NotePage = () => {
    const { user }  = useAuth();
    const router = useRouter();
    const noteAndRoute = router.query;
    const noteId = noteAndRoute.noteId;

    const { data } = useSWR( user ? [`/api/note/${noteId}`, user.token] : null, fetcher)
    const note = data?.note;
    if(!data){
        return <Text> Loading... </Text>
    }
    console.log(note)
    return <Menu>
            <Renderednote title={note.title} cues={note.cues} notes={note.notes} summary={note.summary} date={format(parseISO(note.createdAt), 'MMMM dd yyyy')}/>
        </Menu>

}

export default NotePage;