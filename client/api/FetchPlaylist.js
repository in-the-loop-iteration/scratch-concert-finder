import axios from 'axios';

const FetchPlaylist = async place_id => {
  try {
    const data = JSON.stringify({ place_id });
    const config = {
      method: 'get',
      url: 'http://localhost:3000/api/playlist',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };
    return await axios(config).then(response => response.data);
  } catch (e) {
    console.log(e);
  }
};

export default FetchPlaylist;
