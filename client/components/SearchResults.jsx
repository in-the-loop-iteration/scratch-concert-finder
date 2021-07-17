import React from 'react';
import '../css/searchResult.css'

const SearchResults = ({ searchResults, handlePlaylist, setPlaylist, setPlay, setPlaylistIdx, setSearchAgain }) => {
  return (
  <div className="placePanel" style={{ cursor: 'pointer' }}>
    {searchResults.map((result, i) => (
        <div
          onClick={() => {
            setPlaylist(undefined);
            setPlay(false);
            setPlaylistIdx(0);
            handlePlaylist(result);
            setSearchAgain(false);
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || ' ') {
              setPlaylist(undefined);
              setPlay(false);
              setPlaylistIdx(0);
              handlePlaylist(result);
              setSearchAgain(false);
              } else {
              return e;
            }
          }}
          key={i}
          id={result.place_id}
          className="place-item"
          tabIndex={0}
        >
          {result.description}
        </div>
      
    ))}
  </div>
)
    };

export default SearchResults;
