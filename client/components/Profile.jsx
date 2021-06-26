import React, { useState } from 'react';
import { Avatar, Box, Flex, List, Text } from '@chakra-ui/react';
import FavoriteSong from './FavoriteSong';

const initialFavoriateSongs = [
  {
    track: {
      id: '32M5CgyOmMJA5vzTQirbGr',
      name: 'Bradley',
      uri: 'spotify:track:32M5CgyOmMJA5vzTQirbGr',
      href: 'https://api.spotify.com/v1/tracks/32M5CgyOmMJA5vzTQirbGr',
      external_urls: {
        spotify: 'https://open.spotify.com/track/4QNpBfC0zvjKqPJcyqBy9W',
      },
    },
    album: {
      id: '71tPWkpLU4nXoyM2i4Q1ax',
      name: 'Bradley',
      uri: 'spotify:album:71tPWkpLU4nXoyM2i4Q1ax',
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/ab67616d0000b2739d468a17f5e6c40a3e9d2aee',
          width: 640,
        },
      ],
      href: 'https://api.spotify.com/v1/albums/71tPWkpLU4nXoyM2i4Q1ax',
      external_urls: {
        spotify: 'https://open.spotify.com/album/4rG0MhkU6UojACJxkMHIXB',
      },
    },
    artist: {
      id: '4hgvJQ6te9I2VRBatFbhov',
      name: 'Casey Ahern',
      href: 'https://api.spotify.com/v1/artists/4hgvJQ6te9I2VRBatFbhov',
      uri: 'spotify:artist:4hgvJQ6te9I2VRBatFbhov',
      external_urls: {
        spotify: 'https://open.spotify.com/artist/0TnOYISbd1XYRBk9myaseg',
      },
    },
  },
];

const Profile = () => {
  const [favoriteSongs, setFavoriteSongs] = useState(initialFavoriateSongs);
  return (
    <Flex
      flexDirection="column"
      paddingLeft={20}
      paddingRight={20}
      h="100%"
      w="100%"
      bgGradient={[
        'linear(to-tr, teal.300,yellow.400)',
        'linear(to-t, blue.200, teal.500)',
        'linear(to-b, orange.100, purple.300)',
      ]}
    >
      <Flex marginTop={10}>
        <Avatar src="https://bit.ly/sage-adebayo" />
        <Box ml="3">
          <Text fontWeight="bold">Segun Adebayo</Text>
          <Text fontSize="sm">UI Engineer</Text>
        </Box>
      </Flex>
      {favoriteSongs.length > 0 && (
        <Flex flexDirection="column" marginTop={10}>
          <Text fontSize="lg" marginBottom={5}>
            Favorite Songs
          </Text>
          <List spacing={3}>
            {favoriteSongs.map((song) => (
              <FavoriteSong song={song} />
            ))}
          </List>
        </Flex>
      )}
    </Flex>
  );
};

export default Profile;
