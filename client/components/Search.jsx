import React, {useState} from 'react'
import { chakra, Box, Button, Image, Input, Center, useDisclosure, Drawer, DrawerOverlay, DrawerBody, DrawerHeader, DrawerContent, useBoolean, list } from '@chakra-ui/react'
import { InfoOutlineIcon, CalendarIcon } from '@chakra-ui/icons'



const Search = () => {
    const [ search, setSearch ] = useState('')
    const { onClose, isOpen, onOpen} = useDisclosure()
    const [flag, setFlag] = useBoolean()
    const handleKeyDown = (e) => {
        if(e.key === 'Enter'){

            setSearch(e.target.value)
            console.log({search})
        }
    }
    return(
        <Box 
        w="100%"
        h="100%"
        bgGradient="linear(red.100 0%, orange.100 25%, yellow.100 50%)"
        >
        
        <Center>
            <InfoOutlineIcon
            mt={10}
            ml={'10%'}
            mr={5}
            onClick={onOpen}
            cursor={'pointer'}
            />
        <Input 
        mt={10} 
        bg='white' 
        mr={5} 
        placeholder="Search by City, State, or Zip Code"
        onChange={
            e => setSearch(e.target.value)
        }
        onKeyDown={
            (e) => {
                if(e.key === 'Enter'){
                    setSearch(e.target.value)
                    console.log({search})
                }
            }
        }
        >
        </Input>
        <CalendarIcon 
        onClick={onOpen}
        mr={"10%"}
        mt={10}
        cursor={'pointer'}
        />
    <Drawer 
    placement="right" 
    onClose={onClose} 
    isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">Your Events</DrawerHeader>
        <DrawerBody>
            <p>This concert...</p>
            <p>That concert...</p>
            <p>Those concerts....</p>
        </DrawerBody>
        </DrawerContent>
    </Drawer>
    <Drawer 
    placement="left" 
    onClose={onClose} 
    isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
        <DrawerHeader 
        borderBottomWidth="1px">
            Your Profile
            </DrawerHeader>
        <DrawerBody>
            <p>Some elements</p>
            <p>Some more elements......</p>
            <p>Sign Out</p>
        </DrawerBody>
        </DrawerContent>
    </Drawer>
        </Center>
        <Image 
        src="images/Universal Recycling Symbol (U+2672).svg"
        ml={'auto'}
        mr={'auto'}
        mt={25}
        mb={25}
        h={1000}
        _filter={'blur(1.5rem)'}
        />
      </Box>
    )
}

export default Search