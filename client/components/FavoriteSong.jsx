import React from 'react';
import { Avatar, Icon, Flex, Link, ListItem, Text } from '@chakra-ui/react';
import { GiTicket } from 'react-icons/gi';
import { AiFillCloseCircle } from 'react-icons/ai';

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
        <Flex flexDirection="column" paddingLeft={3}>
          <Icon
            margin="auto"
            as={GiTicket}
            w={8}
            h={8}
            onClick={() => window.open(song.ticketsLink)}
          />
        </Flex>
        <Flex flexDirection="column" paddingLeft={3}>
          <Icon
            margin="auto"
            as={AiFillCloseCircle}
            w={8}
            h={8}
            onClick={() => console.log('we will add remove favorite songs functionality later')}
          />
        </Flex>
      </Flex>
    </ListItem>
  );
};

export default FavoriteSong;
