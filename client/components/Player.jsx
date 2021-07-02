import React from 'react';
import { Text } from '@chakra-ui/react';
import SpotifyPlayer from 'react-spotify-web-playback';

const Player = ({ spotifyToken, playlist }) => {
  const playerStyle = {
    bgColor: '#000000',
    color: '#dbdbdb',
    sliderHandleColor: '#dbdbdb',
    sliderColor: 'yellowgreen',
    sliderTrackColor: '#000000',
    trackNameColor: '#dbdbdb',
    fontFamily: "'Helvetica Neue', sans-serif",
    marginBottom: '20px',
  };

  return (
    <div className="display grid">
      <div className="spotify" style={{ width: '33%', marginTop: '20px' }}>
        <SpotifyPlayer token={spotifyToken} uris={[playlist[0].track.uri]} styles={playerStyle} />
      </div>
      <Text style={{ marginTop: '20px' }}>
        {playlist[0].artist.name} is playing at {playlist[0].venue} soon!
        <a href={playlist[0].ticketsLink}>Click here to buy tickets!</a>
      </Text>
    </div>
  );
};

export default Player;
