import React, { useState } from 'react';
import '../css/IPodGraphic.css';

// HTMl/CSS iPod courtesy of https://codepen.io/freepen

const IPodGraphic = ({ playlist, searchResults }) => {
  const [playlistIdx, setPlaylistIdx] = useState(0);
  const [play, setPlay] = useState(false);
  return (
  <div className="back-cover">
    <div className="main">
      <div className="screen">
        { playlist !== undefined && playlist.length > 0 ? (
          <div className="playlist-item">
            <div id="playlist-title">
            {playlist[playlistIdx].title} at {playlist[playlistIdx].venue}
            </div>
            <iframe 
              width="240" 
              height="150" 
              src={ play ?
                `https://www.youtube.com/embed/${playlist[playlistIdx].videoId}?controls=0&autoplay=1`
                : `https://www.youtube.com/embed/${playlist[playlistIdx].videoId}?controls=0`} 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; modestbranding; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen></iframe>
          </div>
        ) : playlist }

        {searchResults.length > 0 && (Array.isArray(playlist) && playlist.length === 0) && (
					<div>No concerts found in this area!</div>
				)}
      </div>
      <div className="navigator">        
          <div className="keys">                   
              <span 
                className="tickets-btn"
                onClick={() => open(playlist[playlistIdx].ticketsLink)}
              >
                TICKETS
              </span>
            
              <img
                className="fwd" 
                src="https://cdn2.iconfinder.com/data/icons/snipicons/5000/fast-forward-256.png" 
                onClick={() => {
                  if (playlistIdx < playlist.length && playlist[playlistIdx + 1] !== undefined) {
                    setPlaylistIdx(playlistIdx + 1);
                  }
                }}  
              />
              
              <img 
                className="bkd" 
                src="https://cdn2.iconfinder.com/data/icons/snipicons/5000/fast-backward-128.png" 
                onClick={() => {
                  if (playlistIdx > 0) {
                    setPlaylistIdx(playlistIdx - 1);
                  }
                }}  
              />
              
              <img className="play-pause" 
                src="https://cdn2.iconfinder.com/data/icons/snipicons/5000/play-128.png" 
                onClick={() => {
                  if (play === true) {
                    setPlay(false);
                  } else {
                    setPlay(true);
                  }
                }}
              />
            
              <div className="play">
              </div>
          </div>
      </div>
    </div>
  </div>
  )
};

export default IPodGraphic;