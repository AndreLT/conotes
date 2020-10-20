import React from 'react';
import useSWR from 'swr';
import { Flex,  Spinner, Text, PseudoBox } from '@chakra-ui/core';
import Link from 'next/link'

import fetcher from '../utils/fetcher'
import Menu from '../components/menu';
import Pagination from '../components/pagination'
import { useAuth } from '../lib/auth';
import useLocalStorage from '../utils/uselocalstorage';
const UserNotes = () => {

  const {user}= useAuth();

  const [fetchLimit, setFetchLimit] = useLocalStorage('fetchLimit', 8)

  const { data, error } = useSWR( user ? [`/api/notes?limit=${fetchLimit}`, user.token] : null, fetcher)
  
  if(!data?.notes){
    return(
      <Menu>
        <Spinner/>
      </Menu>
    )
  }

  return (
    <Menu>
      {data.notes.length ?
        <Pagination limit={fetchLimit} notes={data.notes} />
        :
        <Flex direction='column' padding={10} mt={6} boxShadow="2px 2px 6px #cccccc" align='center'>
          <Text fontSize="2xl" fontWeight='bold'>You dont have any notes yet :'(</Text>
          <Text fontSize="xl">Lets change that!</Text>
          <Link href="/newnote" passHref>
            <PseudoBox
              as="button"
              cursor="pointer"
              fontWeight="semibold"
              borderRadius={6}
              color="white"
              w={["80%", "60%", "50%", "30%"]}
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