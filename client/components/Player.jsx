import React, {useState} from 'react'
import { chakra, Box, Button, Image, Input, Center, useDisclosure, Drawer, DrawerOverlay, DrawerBody, DrawerHeader, DrawerContent, useBoolean, list } from '@chakra-ui/react'
import { InfoOutlineIcon, CalendarIcon } from '@chakra-ui/icons'
import SpotifyPlayer from 'react-spotify-web-playback';

export default Player = () => {
    <div>
    <Center>
        <Text
  bgGradient="linear(to-l, #7928CA,#FF0080)"
  bgClip="text"
  fontSize="6xl"
  fontWeight="extrabold"
>
  Welcome to Chakra UI
</Text>
        <SpotifyPlayer
        token=""
        uris={[]}
        />
    </Center>
    </div>
}
