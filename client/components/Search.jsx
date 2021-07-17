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
// import FetchSpotifyAccessToken from '../api/FetchSpotifyAccessToken';
// import extractQueryParams from '../utils/extractQueryParams.js';
// import Player from './Player';
import SearchResults from './SearchResults';
import '../css/search.css';

const Search = () => {
  //state for drawer controls
	const { isOpen, onOpen, onClose } = useDisclosure();

  //state for search results and playlist retrieval
	const [search, setSearch] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [playlist, setPlaylist] = useState(undefined);
	const [searchAgain, setSearchAgain] = useState(false);

  //state that controls the iPod
  const [play, setPlay] = useState(false);
  const [playlistIdx, setPlaylistIdx] = useState(0);

  //state for logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //state for user info
	const [userInfo, setUserInfo] = useState({
		email: '',
		name: '',
	});

	// const [spotifyToken, setSpotifyToken] = useState('');
	// const [loading, setLoading] = useState(true);

	// useEffect(() => {
	// 	handleFetchSpotifyAccessToken();
	// }, []);

	// const handleFetchSpotifyAccessToken = async () => {
	// 	const code = extractQueryParams('code');
	// 	const token = await FetchSpotifyAccessToken(code);
	// 	setSpotifyToken(token);
	// 	setLoading(false);
	// };

	const handleSearchForLocation = async () => {
		const results = await FetchMapSearchResults({ searchQuery: search });
    let filteredResults = [];
    for (let i = 0; i<results.length; i++){
      if (Number.isNaN(results[i].description[0]*1)){
        filteredResults.push(results[i])
      }
    }
		setSearchResults(filteredResults);
	};

	const handlePlaylist = async (result) => {
		const playlistData = await FetchPlaylist({ placeId: result.place_id });
		setPlaylist(playlistData);
	};

	// if (loading) return <p>Loading</p>;

	return (
		<div className='search'>
      <div className='infoIcon'>
				<ChevronLeftIcon 
          w={6}
          h={6}
          onClick={onOpen}
          onKeyPress={(e) => e.key === 'Enter' || ' ' ? onOpen() : e}
          cursor='pointer'
          tabIndex={0} />
      </div>
      { playlist !== undefined && playlist.length > 0 && (
        <div className="now-playing"> 
          Now Playing: {playlist[playlistIdx].title} at {playlist[playlistIdx].venue}
        </div>
      )} 
      { playlist !== undefined && playlist.length === 0 && (
        <div className="now-playing"> 
          No concerts found in this area.
        </div>
      )} 
      <IPodGraphic 
        play={play}
        setPlay={setPlay}
        playlistIdx={playlistIdx}
        setPlaylistIdx={setPlaylistIdx}
        playlist={playlist}
        searchResults={searchResults}
        key={Date.now().toString}
        />
      <div className='sidepanel'>
        <Drawer 
          placement='right' 
          onClose={onClose} 
          isOpen={isOpen} 
          w={'25%'}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth='1px'>Your Profile</DrawerHeader>
            <DrawerBody>
              <Profile
                isLoggedIn={isLoggedIn} 
                setIsLoggedIn={setIsLoggedIn} 
                userInfo={userInfo}
                setUserInfo={setUserInfo} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
      <div className='searchBox'>
        <div className='searchBar'>
          <Input
            className='input'
            placeholder='Enter your zip code to hear artists playing near you!'
            onChange={(e) => {
							setSearch(e.target.value);
						}}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
								if (playlist !== undefined) {
									setSearchResults([]);
									setSearchAgain(true);
								}	
                handleSearchForLocation();
              }
            }}
          />
        </div>
        <div className='searchResults'>
          {searchResults.length > 0 && (! playlist || playlist.length === 0 || searchAgain) && (
            <SearchResults
              searchResults={searchResults}
              handlePlaylist={handlePlaylist}
							setPlaylist={setPlaylist}
              setPlay={setPlay}
							setPlaylistIdx={setPlaylistIdx}
							setSearchAgain={setSearchAgain}
              className='place-item'
            />
          )}
        </div>
      </div>
		</div>
	);
};

export default Search;
