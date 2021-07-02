import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Flex, List, Spinner, Text } from '@chakra-ui/react';
import FavoriteSong from './FavoriteSong';
import FetchUserDetails from '../api/FetchUserDetails';

const Profile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const scope =
    'streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state';

  useEffect(() => {
    handleFetchUser();
  }, []);

  const handleFetchUser = async () => {
    setUser(await FetchUserDetails({ id: '60d7870b938dce51e194dc4c' }));
    setLoading(false);
  };

  if (loading) return <Spinner />;

  return (
    <Flex flexDirection="column" paddingLeft={10} paddingRight={10} h="100%" w="25%">
      <Flex marginTop={10}>
        <Avatar src="https://bit.ly/sage-adebayo" />
        <Box ml="3">
          <Text fontWeight="bold">{user.name}</Text>
          <Text fontSize="sm">{user.email}</Text>
        </Box>
      </Flex>
      <Flex marginTop={10}>
        <Button
          onClick={() =>
            window.open(
              `https://accounts.spotify.com/authorize?client_id=aa263d7fcc054c2c8d8c5be8dc115117&response_type=code&redirect_uri=http:%2F%2Flocalhost:8080%2Fcallback&scope=${scope}`
            )
          }
        >
          Spotify Authorization
        </Button>
      </Flex>
      {user.favoriteSongs.length > 0 && (
        <Flex flexDirection="column" marginTop={10}>
          <Text fontSize="lg" marginBottom={5} style={{ 'white-space': 'nowrap' }}>
            Favorite Songs
          </Text>
          <List spacing={3}>
            {user.favoriteSongs.map((song) => (
              <FavoriteSong key={song.track.id} song={song} />
            ))}
          </List>
        </Flex>
      )}
    </Flex>
  );
};

export default Profile;
