import React from 'react';
import useSWR from 'swr';
import { Flex,  Spinner, Text, Heading, PseudoBox } from '@chakra-ui/core';
import Link from 'next/link'

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
            {data.notes.length ?
                <NotesGrid notes={data.notes}/>
                :
                <Flex direction='column' padding={10} boxShadow="2px 2px 4px #888888" align='center'>
                    <Text fontSize="2xl" fontWeight='bold'>You dont have any notes yet :'(</Text>
                    <Text fontSize="xl">Lets change that!</Text>
                    <Link href="/newnote" passHref>
                      <PseudoBox
                        as="button"
                        cursor="pointer"
                        fontWeight="semibold"
                        borderRadius={6}
                        color="white"
                        w="20%"
                        px={3}
                        py={4}
                        mt={5}
                        bg="#1062de"
                        _hover={{ bg: "#adceff" }}
                      >
                        Create your first note
                      </PseudoBox>
                    </Link>
                </Flex>
            }
        </Menu>
    )
}

export default UserNotes;