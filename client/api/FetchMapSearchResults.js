import axios from 'axios';

const FetchMapSearchResults = async searchQuery => {
  try {
    const data = JSON.stringify({ searchQuery });
    const config = {
      method: 'get',
      url: 'http://localhost:3000/api/location-search',
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

export default FetchMapSearchResults;
