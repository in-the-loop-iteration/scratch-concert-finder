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
import { ChevronLeftIcon } from '@chakra-ui/icons';
import IPodGraphic from './IPodGraphic';
import FetchMapSearchResults from '../api/FetchMapSearchResults';
import FetchPlaylist from '../api/FetchPlaylist';
import Profile from '/client/components/Profile.jsx';
import FetchSpotifyAccessToken from '../api/FetchSpotifyAccessToken';
import extractQueryParams from '../utils/extractQueryParams.js';
import Player from './Player';
import SearchResults from './SearchResults';
import '../css/search.css';

const Search = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [search, setSearch] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [playlist, setPlaylist] = useState(undefined);
	const [spotifyToken, setSpotifyToken] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		handleFetchSpotifyAccessToken();
	}, []);

	const handleFetchSpotifyAccessToken = async () => {
		const code = extractQueryParams('code');
		const token = await FetchSpotifyAccessToken(code);
		setSpotifyToken(token);
		setLoading(false);
	};

	const handleSearchForLocation = async () => {
		const results = await FetchMapSearchResults({ searchQuery: search });
    let filteredResults = [];
    for (let i = 0; i<results.length; i++){
      //console.log(results[i].description[0]*1);
      if (Number.isNaN(results[i].description[0]*1)){
        filteredResults.push(results[i])
      }
    }
    // console.log(filteredResults);
		setSearchResults(filteredResults);
	};

	const handlePlaylist = async (result) => {
		const playlistData = await FetchPlaylist({ placeId: result.place_id });
		setPlaylist(playlistData);
	};

	if (loading) return <p>Loading</p>;

	return (
		<div className='search'>
      <div className='infoicon'>
				<ChevronLeftIcon 
          w={6}
          h={6}
          onClick={onOpen}
          onKeyPress={(e) => e.key === 'Enter' || ' ' ? onOpen() : e}
          cursor='pointer'
          tabIndex={0} />
      </div>
      <IPodGraphic 
        playlist={playlist}
        searchResults={searchResults}
        key={Date.now().toString}
        />
      <div className='sidepanel'>
        <Drawer placement='right' onClose={onClose} isOpen={isOpen} w={'25%'}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth='1px'>Your Profile</DrawerHeader>
            <DrawerBody>
              <Profile />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
      <div className='searchbox'>
        <div className='searchbar'>
          <Input
            className='input'
            placeholder='Enter your Zip Code to hear artists playing near you'
            onChange={(e) => {setSearch(e.target.value)}}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearchForLocation();
              }
            }}
          />
        </div>
        <div className='searchResults'>
          {searchResults.length > 0 && (! playlist || playlist.length === 0) && (
            <SearchResults
              searchResults={searchResults}
              handlePlaylist={handlePlaylist}
              className='place-item'
            />
          )}
        </div>
      </div>
		</div>
	);
};

export default Search;
