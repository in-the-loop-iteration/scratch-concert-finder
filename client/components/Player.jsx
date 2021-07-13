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
    fontSize: '18px',
  };
  const iframes = playlist.map(item => (
    <div className="searchResults">
      <iframe width="560" height="315" src={`https://www.youtube.com/embed/${item.videoId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      <p style={{ fontSize: '18px', fontWeight: 400 }}>
        Attend {item.title} at {item.venue} soon!
      </p>
      <p style={{ fontSize: '18px', fontWeight: 400 }}>
        {' '}
        <a href={item.ticketsLink}>Click here to buy tickets!</a>{' '}
      </p>
    </div>
  ));

  return (
    iframes
  );

  // <div className="searchResults">
  //   <iframe width="560" height="315" src={`https://www.youtube.com/embed/${playlist[0].videoId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
  //   {/* <div className="spotify" style={{ width: '47%', marginTop: '20px', backgroundColor: 'none' }}>
  //     <SpotifyPlayer token={spotifyToken} uris={[playlist[0].track.uri]} styles={playerStyle} />
  //   </div> */}
  //   <p style={{ fontSize: '18px', fontWeight: 400 }}>
  //     Attend {playlist[0].title} at {playlist[0].venue} soon!
  //   </p>
  //   <p style={{ fontSize: '18px', fontWeight: 400 }}>
  //     {' '}
  //     <a href={playlist[0].ticketsLink}>Click here to buy tickets!</a>{' '}
  //   </p>
  // </div>
};

export default Player;
