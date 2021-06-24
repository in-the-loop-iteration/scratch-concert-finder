import React from 'react'
import { Button, Input, Center, useDisclosure, Drawer, DrawerOverlay, DrawerBody, DrawerHeader, DrawerContent, useBoolean } from '@chakra-ui/react'
import { InfoOutlineIcon, CalendarIcon } from '@chakra-ui/icons'


const Search = () => {
    const { onClose, isOpen, onOpen} = useDisclosure()
    const [flag, setFlag] = useBoolean()
    return(
        <Center>
        <Input ml={'10%'}  mr={5} placeholder="Search by City, State, or Zip Code">
        </Input>
        <CalendarIcon mr={5} onMouseEnter={{border: '1px solid blue'}} />
    
    <Button  onClick={onOpen} mr={'10%'} p={5}>View Profile</Button>
    <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">Your Profile</DrawerHeader>
        <DrawerBody>
            <p>This concert...</p>
            <p>That concert...</p>
            <p>Those concerts....</p>
        </DrawerBody>
        </DrawerContent>
    </Drawer>
    
        </Center>
    )
}

export default Search