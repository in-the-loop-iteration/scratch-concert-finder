import React from 'react';

const SearchResults = ({ searchResults, handlePlaylist }) => {
  console.log(searchResults)
  return (
  <div className="placePanel" style={{ cursor: 'pointer' }}>
    {searchResults.map((result, i) => (
        <div
          onClick={() => handlePlaylist(result)}
          key={i}
          id={result.place_id}
          // style={{ marginTop: '2em' }}
          className="place-item"
        >
          {result.description}
        </div>
      
    ))}
  </div>
)
    };

export default SearchResults;
