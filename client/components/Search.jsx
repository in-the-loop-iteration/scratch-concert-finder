import React, { useState, useEffect } from 'react';
import {
  Input,
  Center,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
} from '@chakra-ui/react';
import { InfoOutlineIcon, CalendarIcon } from '@chakra-ui/icons';
import FetchMapSearchResults from '../api/FetchMapSearchResults';
import FetchPlaylist from '../api/FetchPlaylist';
import Profile from '/client/components/Profile.jsx';
import FetchSpotifyAccessToken from '../api/FetchSpotifyAccessToken';
import extractQueryParams from '../utils/extractQueryParams.js';
import Map from './Map';
import Player from './Player';
import SearchResults from './SearchResults';
import Footer from './Footer'

const Search = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [spotifyToken, setSpotifyToken] = useState('');

  useEffect(() => {
    handleFetchSpotifyAccessToken();
  }, []);

  const handleFetchSpotifyAccessToken = async () => {
    const code = extractQueryParams('code');
    const token = await FetchSpotifyAccessToken(code);
    setSpotifyToken(token);
  };

  const handleSearchForLocation = async () => {
    const results = await FetchMapSearchResults({ searchQuery: search });
    setSearchResults(results);
  };

  const handlePlaylist = async (result) => {
    const playlistData = await FetchPlaylist({ placeId: result.place_id });
    setPlaylist(playlistData);
  };

  return (
    <div>
      <Map />
      <Center>
        <InfoOutlineIcon onClick={onOpen} mt={10} ml="10%" mr={5} cursor="pointer" />
        <Input
          w="50%"
          mt={10}
          bg="white"
          mr={5}
          placeholder="Enter your Zip Code to hear artists playing near you"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearchForLocation();
            }
          }}
        />
        <CalendarIcon onClick={console.log('calendar')} mr="10%" mt={10} cursor="pointer" />

        <Drawer placement="left" onClose={onClose} isOpen={isOpen} w={'25%'}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Your Profile</DrawerHeader>
            <DrawerBody>
              <Profile />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Center>
      {searchResults.length > 0 && playlist.length === 0 && (
        <SearchResults searchResults={searchResults} handlePlaylist={handlePlaylist} />
      )}
      {playlist.length > 0 && <Player spotifyToken={spotifyToken} playlist={playlist} />}
      <Footer />
    </div>
  );
};

export default Search;
