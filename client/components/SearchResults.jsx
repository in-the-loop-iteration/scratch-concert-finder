import React from 'react';
import { Center } from '@chakra-ui/react';

const SearchResults = ({ searchResults, handlePlaylist }) => (
  <div className="display grid" style={{ cursor: 'pointer' }}>
    {searchResults.map((result, i) => (
      <Center key={result.place_id}>
        <p
          onClick={() => handlePlaylist(result)}
          key={i}
          id={result.place_id}
          style={{ marginTop: '2em' }}
        >
          {result.description}
        </p>
      </Center>
    ))}
  </div>
);

export default SearchResults;
