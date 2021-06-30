import React from 'react';
import { Avatar, Flex, Link, ListItem, Text } from '@chakra-ui/react';

const FavoriteSong = ({ song }) => {
  const { track, album, artist } = song;
  return (
    <ListItem key={track.id}>
      <Flex>
        <Avatar src={album.images[0].url} />
        <Flex flexDirection="column" paddingLeft={3}>
          <Text fontWeight="bold">
            <Link color="teal.500" href={track.external_urls.spotify} isExternal>
              {track.name}
            </Link>
          </Text>
          <Text fontSize="sm">
            <Link color="teal.500" href={artist.external_urls.spotify} isExternal>
              {artist.name}
            </Link>
          </Text>
        </Flex>
      </Flex>
    </ListItem>
  );
};

export default FavoriteSong;
