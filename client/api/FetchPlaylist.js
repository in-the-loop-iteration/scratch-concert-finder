import axios from 'axios';

const FetchPlaylist = async ({ placeId }) => {
  try {
    return axios.post('/api/playlist', { placeId }).then((response) => response.data);
  } catch (e) {
    console.log(e);
  }
};

export default FetchPlaylist;
