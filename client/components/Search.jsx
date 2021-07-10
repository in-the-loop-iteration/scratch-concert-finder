import React, { useState, useEffect } from 'react';
import {
  Input,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
} from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import FetchMapSearchResults from '../api/FetchMapSearchResults';
import FetchPlaylist from '../api/FetchPlaylist';
import Profile from '/client/components/Profile.jsx';
import FetchSpotifyAccessToken from '../api/FetchSpotifyAccessToken';
import extractQueryParams from '../utils/extractQueryParams.js';
import Player from './Player';
import SearchResults from './SearchResults';
import '../css/search.css'

const Search = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [spotifyToken, setSpotifyToken] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleFetchSpotifyAccessToken();
  }, []);

  const handleFetchSpotifyAccessToken = async () => {
    const code = extractQueryParams('code');
    const token = await FetchSpotifyAccessToken(code);
    setSpotifyToken(token);
    setLoading(false)
  };

  const handleSearchForLocation = async () => {
    const results = await FetchMapSearchResults({ searchQuery: search });
    setSearchResults(results);
  };

  const handlePlaylist = async (result) => {
    const playlistData = await FetchPlaylist({ placeId: result.place_id });
    setPlaylist(playlistData);
  };

  if (loading) return <p>Loading</p>

  return (
    <div className='search'>
        <div className="searchbar">
      <InfoOutlineIcon
        onClick={onOpen} 
        cursor="pointer" 
        />
        <Input className='input'
          placeholder="Enter your Zip Code to hear artists playing near you"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearchForLocation();
            }
          }}
        />
          </div>
        <div className='searchResults'>
         <p>Search for concerts and events near you!</p>
          
      {searchResults.length > 0 && playlist.length === 0 && (
        <SearchResults searchResults={searchResults} handlePlaylist={handlePlaylist} className="place-item"/>
      )}
      {playlist.length > 0 && <Player spotifyToken={spotifyToken} playlist={playlist} />}
        </div>
      

      <div className="sidepanel">
        <Drawer placement="right" onClose={onClose} isOpen={isOpen} w={'25%'}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Your Profile</DrawerHeader>
            <DrawerBody>
              <Profile />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        </div>
    </div>
  );
};

export default Search;