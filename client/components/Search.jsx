import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  Box,
  Image,
  Input,
  Center,
  Copyright,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  Text,
  Stack,
  Footer,
  Slide
} from '@chakra-ui/react';
import { InfoOutlineIcon, CalendarIcon, SmallCloseIcon } from '@chakra-ui/icons';
import SpotifyPlayer from 'react-spotify-web-playback';
import FetchMapSearchResults from '../api/FetchMapSearchResults';
import FetchPlaylist from '../api/FetchPlaylist';
import Profile from '/client/components/Profile.jsx'
import Player from '/client/components/Player.jsx';
import Map from './Map';
import styles from './Map.css'

const Search = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [flag, setFlag] = useState(false);
  const [clicked, setClick] = useState(false);
  const [playlist, setPlaylist] = useState([])
  const [place, setPlace] = useState(null);
  const [load, setLoad] = useState(false);
  const [renderArray, setRenderArray] = useState(null);
  const [visible, setVisible] = useState(true)
  const [ places, setPlaces ] = useState([
    
  ])
  const handleSearchForLocation = async (e) => {
    e.preventDefault()
    const results = await FetchMapSearchResults({ searchQuery: search })
    const finalResult = results[0].description
    setSearchResults(await FetchMapSearchResults({ searchQuery: search }))
    
    setSearch('')
    console.log('search results are',  searchResults)
    console.log('searchResults in func', results[0].description);
        }

  const handlePlaylist = async (result) => {
      console.log(result)
      const playlistData = await FetchPlaylist({placeId : result.place_id})
      setPlaylist(playlistData)
      console.log('this is the playlist ', playlistData)
      setLoad(true)
      setFlag(false)
      
  }

  const handlePlayer = () => {
      setLoad(true)
      setFlag(false)
  }

  const handleChange = (e) => {
    e.preventDefault()
    setSearch(e.target.value)
    console.log(e.target.value)
  } 

  const handleSubmit = (e) => {
    e.preventDefault()
    // setSearch(e.target.value)
    const accessToken = 'pk.eyJ1IjoiaWtqdWRkIiwiYSI6ImNrcWppMTM2ZTA5ODQybm9ieTE5M2J0YTAifQ._eHutyLjit-nTSOpnD-Vmg';
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=${accessToken}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const oldPlaces = places;
        const firstResult = data.features[0]
        
        oldPlaces.push({
          name: search,
          address: firstResult.properties.address
        })
        // console.log('our old places ', oldPlaces)
        setPlaces(oldPlaces)
        // console.log('our places', places)
        setSearch('')
      })
  }
  const PlacesPanel = () => {
    return(<div className='places'>
      Search for concerts and events near you!
    </div>)
  }

  const placeItems = places.map((place, index) => {
    return <div
    place={place}
    className='place-item'
    key={index}
    onClick={() => setLoad(true)}
    style={{'padding-left':'40px'}}
    >
    {searchResults}
    </div>
  })
  return (
    
    <div className="App">
    
      <Map style={styles}/>
      <div className='box overlay'>
      {/* <div
      className="header"      
      > */}
      <p>In The Loop ∞</p>
           <div 
           className="searchbar"
           > 
             <form onSubmit ={handleSearchForLocation}>
             <Input 
             value={search} 
             onChange={handleChange}
             placeholder="Search by Zip Code" 
             ml={9}
             mt={7}
             mr={3}
             mb={8}
             w={450}
             bg={'white'}/>
             </form>
             <InfoOutlineIcon 
           onClick={onOpen} 
           cursor="pointer" 
           className="display"/>

           </div>
           <div className="placesPanel">
             <PlacesPanel />
             {placeItems}
           </div>
           </div>
           {/* </div> */}



{/* 

        {!clicked && (
          <Text
            // color='lightgray'
            fontWeight="semibold"
            fontSize="18px"
            mt={10}
            mr={5}
            cursor="pointer"
            onClick={(e) => setClick(true)}
            _hover={{
              background: 'white',
              color: 'teal.500',
            }}
            className="display"
          >
            <p> 
            Find upcoming concerts and events near you!
            </p>
          </Text>
        )} */}

        {clicked && (
          <Input
          className="display"
            w="50%"
            t={0}
            bg="white"
            l={0}
            placeholder="Search by City, State, or Zip Code"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
                if(e.key === 'Enter'){
                    handleSearchForLocation()
                    setVisible(false)
                    setFlag(true)
                    console.log('search results are ', searchResults)
                }
                }
            }
          />
        )}
        {/* <CalendarIcon onClick={console.log('calendar')} mr="10%" mt={10} cursor="pointer" /> */}
        
        <Drawer placement="right" onClose={onClose} isOpen={isOpen} w={'25%'}
        className="display">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Your Profile</DrawerHeader>
            <DrawerBody>
                <>
            <Profile />
            </>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
   


      {visible && (
        <Image
          src="client/images/Universal Recycling Symbol (U+2672).svg"
          ml="auto"
          mr="auto"
          h={750}
          _filter="blur(1.5rem)"
        />
      )}

    {flag && (
        <div className='display grid' style={{cursor: 'pointer'}}>
            {searchResults.map((result, i) => 
                <Center>
            <p 
            onClick={ ()=>
                handlePlaylist(result)
                
            }
            key={i}
            id={result.place_id}
            style={{'marginTop': '2em'}}>
                {result.description}
                
            </p>
            </Center>
            )}
            
        </div>
    )}
 
      {load && (
   <div className="display grid">
            <Text bgGradient="linear(to-l, #7928CA,#FF0080)" bgClip="text" fontSize="6xl" fontWeight="extrabold">
            Artists playing in your area!
            
            {/* {playlist[0].spotifyToken} */}
            {/* {playlist[0].track.uri} */}
            </Text>
            <div className='spotify' style={{'width': '33%'}}>
          <SpotifyPlayer 
          token={playlist[0].spotifyToken} 
          uris={[ playlist[0].track.uri ]}
         
          styles={{
              activeColor:'#fff',
              bgColor: '#333',
           color:'#dbdbdb',
           sliderHandleColor: '#dbdbdb',
           sliderColor: 'yellowgreen',
           sliderTrackColor: '#000000',
           height:'300px',
           trackNameColor:'#dbdbdb',
           'font-family': "'Helvetica Neue', sans-serif",
           'margin-bottom': '20px'}} />
           </div>
          <Text>
              {playlist[0].artist.name} is playing at {playlist[0].venue} soon! 
          </Text>
              <a href="http://www.ticketmaster.com">Click here to buy tickets!</a>
        </div>
       )} 
        <div className='footer'>
      <Box bg={'white'} role="contentinfo" mx="auto" w={'100%'} h={8} >
    <Stack>
      
         <div className='footer-text'>
      Copyright 2021 Tassled Wobbegong
      </div>
    
      
    </Stack>
  </Box>
  </div>
    </div>
  );
};

export default Search;