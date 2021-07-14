import React, { useState } from 'react';
import '../css/IPodGraphic.css';

// HTMl/CSS iPod courtesy of https://codepen.io/freepen

const IPodGraphic = ({ play, setPlay, playlistIdx, setPlaylistIdx, playlist, searchResults }) => {

  const handleTickets = () => {
    open(playlist[playlistIdx].ticketsLink);
  }

  const handleNextArtist = () => {
    if (playlistIdx < playlist.length && playlist[playlistIdx + 1] !== undefined) {
      setPlaylistIdx(playlistIdx + 1);
    }
  }

  const handlePrevArtist = () => {
    if (playlistIdx > 0) {
      setPlaylistIdx(playlistIdx - 1);
    }
  }

  const handlePlay = () => {
    if (play === true) {
      setPlay(false);
    } else {
      setPlay(true);
    }
  }

  return (
    <div className="back-cover">
      <div className="main">
        <div className="screen">
          { playlist !== undefined && playlist.length > 0 ? (
            <div className="playlist-item">
              <iframe 
                width="250" 
                height="190" 
                src={ play ?
                  `https://www.youtube.com/embed/${playlist[playlistIdx].videoId}?controls=0&autoplay=1`
                  : `https://www.youtube.com/embed/${playlist[playlistIdx].videoId}?controls=0`} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
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
                  tabIndex = {0}
                  onClick={handleTickets}
                  onKeyPress={(e) => e.code === 'Enter' || ' ' ? handleTickets() : e}
                >
                  TICKETS
                </span>
              
                <img
                  className="fwd" 
                  src="https://cdn2.iconfinder.com/data/icons/snipicons/5000/fast-forward-256.png" 
                  tabIndex = {0}
                  onClick={handleNextArtist}
                  onKeyPress={(e) => e.code === 'Enter' || ' ' ? handleNextArtist() : e}
                />
                
                <img 
                  className="bkd" 
                  src="https://cdn2.iconfinder.com/data/icons/snipicons/5000/fast-backward-128.png" 
                  tabIndex = {0}
                  onClick={handlePrevArtist}
                  onKeyPress={(e) => e.code === 'Enter' || ' ' ? handlePrevArtist() : e}
                />
                
                <img 
                  className="play-pause" 
                  src="https://cdn2.iconfinder.com/data/icons/snipicons/5000/play-128.png" 
                  tabIndex = {0}
                  onClick={handlePlay}
                  onKeyPress={(e) => e.code === 'Enter' || ' ' ? handlePlay() : e}
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