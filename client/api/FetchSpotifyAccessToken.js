import axios from 'axios';

const FetchSpotifyAccessToken = async (code) => {
  try {
    return axios.post('/api/spotify-token', { code }).then((response) => {
      console.log(response);
      return response.data
    });
  } catch (e) {
    console.log(e);
  }
};

export default FetchSpotifyAccessToken;
