const googleMapsSearch = require('./googleMapsSearch');

const getLocationSearchResults = async (searchQuery) => {
  try {
    console.log('get location search results')
    const locations = await googleMapsSearch(searchQuery);
    return locations;
  } catch (e) {
    throw new Error(`getLocationSearchResults error: ${e.message}`);
  }
};

module.exports = {
  getLocationSearchResults,
};
