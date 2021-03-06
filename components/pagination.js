import React, { useState, useEffect } from 'react';
import {
	Button,
	Box,
	ButtonGroup,
	Flex,
	Spinner,
	Text,
	IconButton,
	Select, PseudoBox
} from '@chakra-ui/core';
import { mutate } from 'swr';

import Menu from './menu'
import { useAuth } from '../lib/auth';
import fetcher from '../utils/fetcher'
import NotesGrid from './notesgrid'
import useLocalStorage from '../utils/uselocalstorage';
import { max } from 'date-fns';
import useWindowSize from '../utils/windowsize'

const Pagination = (props) => {

	const { user } = useAuth();

	const windowSize = useWindowSize();

	const [pageIndex, setPageIndex] = useState(0);
	const [loadedindex, setLoadedindex] = useState(0);
	const [notes, setNotes] = useState(props.notes);
	const [isLoading, setIsLoading] = useState(false);
	const [fetchLimit, setFetchLimit] = useLocalStorage('fetchLimit', props.limit)
	const [isLast, setIsLast] = useState(fetchLimit > user?.notes);

	const handlePagination = (index) => {
		setPageIndex(pageIndex + index)
		if ((pageIndex + index) > loadedindex) {
			setLoadedindex(loadedindex + 1)
			setIsLoading(true);
			mutate('/api/notes', async () => {
				const newNotes = await fetcher(`/api/notes?last=${notes[notes.length - 1].id}&limit=${fetchLimit}`, user.token)
				return [...notes, ...newNotes.notes]
			}).then((res) => {
				setNotes(res)
				setIsLoading(false)
			})
		}
		setIsLast(pageIndex + index == Math.ceil(user.notes / fetchLimit) - 1)
		if(pageIndex < pageIndex + index)
			scroll(0,0);
	}

	const calcNoteSplit = () => {
		const splitStart =
			(pageIndex == 0) ?
				{ start: 0, end: (fetchLimit - 1) }
				: { start: (pageIndex * fetchLimit), end: (pageIndex * fetchLimit) + parseInt(fetchLimit) }

		return notes.slice(splitStart.start, splitStart.end)
	}

	const handleLimitChange = (newLimit) => {
		setFetchLimit(newLimit)
		setLoadedindex(0)
		setPageIndex(0)
	}

	const pages = []

	if (!user || !notes || isLoading) {
		return (<Spinner />)
	}

	for (let i = 0; i < (Math.floor(user.notes / fetchLimit) + ((user.notes % fetchLimit) != 0 && 1)); i++) {
		pages.push(
			<Box borderWidth="2px" p={1} rounded="full" m={2} key={i} >
				{pageIndex == i ? <Box size="8px" m={1} rounded="full" bg="blue.300" /> : <Box size="8px" m={1} rounded="full" />}
			</Box>
		)
	}

	return (
		<Flex align="center" justify="center" direction='column'>
			<Flex direction="column">
				<Flex w="full" flexWrap="wrap" direction={windowSize.width < 700 ? "column" : "row"} align="center" justify="space-between">
					<PseudoBox 
						py={2} 
						px={4} 
						backgroundColor="#999" 
						mb={2}
						color="white" 
						borderRadius={15} 
						boxShadow="1px 2px 3px #aaa"
					>
						<Text fontWeight="bold" alignSelf="center">You have: {user.notes} notes</Text>
					</PseudoBox>
					<Flex direction="row" align="center">
						<Text mr={4}>Notes per page: </Text>
						<Select w="100px" onChange={(e) => handleLimitChange(e.target.value)} placeholder={fetchLimit}>
							<option value="8">8</option>
							<option value="12">12</option>
							<option value="16">16</option>
							<option value="20">20</option>
							<option value="24">24</option>
							<option value="28">28</option>
							<option value="32">32</option>
						</Select>
					</Flex>
				</Flex>
				<NotesGrid isFirst={pageIndex == 0} notes={calcNoteSplit()} />
        <Box display="flex" alignItems="center" flexDirection="column" flexFlow="column wrap">
          <Text mt={4} color="#777777">{pageIndex * fetchLimit} - {isLast ? user.notes : (pageIndex * fetchLimit + parseInt(fetchLimit))}</Text>
          <Flex mb={5} wrap="wrap" justify="center" align="center" borderRadius={20} boxShadow="0 5px 5px #ddd" bg="#f7f7f7">
            <IconButton variant="ghost" borderTopLeftRadius={20} borderBottomLeftRadius={20} icon="chevron-left" onClick={() => handlePagination(-1)} isDisabled={pageIndex === 0} />
              {pages}
            <IconButton variant="ghost" borderTopRightRadius={20} borderBottomRightRadius={20} icon="chevron-right" onClick={() => handlePagination(1)} isDisabled={isLast} />
          </Flex>
        </Box>
			</Flex>
		</Flex>
	)
}

export default Pagination;