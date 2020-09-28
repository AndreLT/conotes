import React from 'react';
import {
  ButtonGroup,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/core';

import {useAuth} from '../lib/auth' 

const PopoverSingout = ({children}) => {

  const auth = useAuth();

  const initialFocusRef = React.useRef();

  return (
    <Popover
      initialFocusRef={initialFocusRef}
      placement="bottom"
    >
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger>
            {children}
          </PopoverTrigger>
          <PopoverContent
            ml={-10}
            mr={2}
            zIndex={4}
            bg="#fff"
            borderWidth="3px"
            borderColor="#3C8BB9"
          >
            <PopoverArrow bg="#3C8BB9" />
            <PopoverCloseButton />
            <PopoverHeader fontWeight="bold">Sign Out</PopoverHeader>
            <PopoverBody>Are you sure you want to sign out?</PopoverBody>
            <PopoverFooter>
              <ButtonGroup>
                <Button variantColor="red" onClick={() => auth.signout()}>Yes</Button>
                <Button onClick={onClose} ref={initialFocusRef}>No</Button>
              </ButtonGroup>
            </PopoverFooter>
          </PopoverContent>
        </>
      )}
    </Popover>
  )
}

export default PopoverSingout;