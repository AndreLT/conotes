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

    if(!data){
        return <Text> Loading... </Text>
    }

    const {createdAt, ...note} = data.note;
    const date = format(parseISO(createdAt), 'MMMM dd yyyy');
    const treatednote = {date: date, ...note}
    
    return <Menu>
            <Renderednote {...treatednote}/>
        </Menu>

}

export default NotePage;