// const predictHQConcerts = require('./predictHQConcerts');
// const spotifyAccessToken = require('./spotifyAccessToken');
// const spotifyArtistSearch = require('./spotifyArtistSearch');
// const spotifyArtistTopTracks = require('./spotifyArtistTopTracks');
// const googleMapsDistance = require('./googleMapsDistance');
const googleMapsPlaceLatLong = require('./googleMapsPlaceLatLong');
const axios = require('axios');
const { youtubeApiKey, ticketmasterApiKey } = require('../config');

const getPlaylist = async ({ placeId }) => {
  try {
    const coordinates = await googleMapsPlaceLatLong(placeId);
    const config = {
      method: 'get',
      url: `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${ticketmasterApiKey}&latlong=${coordinates.lat},${-coordinates.lng}&radius=100&unit=miles&classificationId=KZFzniwnSyZfZ7v7nJ`,
    };
    const ticketmasterSearchResults = await axios(config).then((response) => {
      return ('_embedded' in response.data) ? response.data._embedded.events : [];
    });
    let concerts = ticketmasterSearchResults.map(concert => {
      const { name, url, distance, dates, _embedded } = concert;
      return {
        title: name,
        url,
        distance,
        start: dates.start.localDate,
        venue: _embedded.venues[0].name
      }
    });
    // let concerts = (await predictHQConcerts(coordinates));
    concerts = concerts.slice(0,2);
    console.log(JSON.stringify(concerts, null, 2));
    // const spotifyToken = await spotifyAccessToken();
    const playlist = await Promise.all(
      concerts.map(async (concert) => {
        const { venue, start, title, distance, url } = concert;
        // if (!entities || entities.length === 0) return;
        // const venue = entities[0];
        const titleScrubbed = title.replace(/[^\w\s]/gi, '').replace(/\s/g, '+');
        // console.log(titleScrubbed);
        // const distance = await googleMapsDistance({
        //   pointA: placeId,
        //   pointB: venue.formatted_address,
        // });
        const config = {
          method: 'get',
          url: `https://www.googleapis.com/youtube/v3/search?key=${youtubeApiKey}&part=snippet&q="${titleScrubbed}"+concert&order=relevance&type=video&videoDefinition=high&videoEmbeddable=true&topicId=/m/04rlf`,
        };
        const youtubeSearchResults = await axios(config).then((response) => {
          // console.log(response.data);
          return response.data.items[0].id.videoId
        });
        const payload = {
          title: title.replace(/[^\w\s]/gi, ''),
          videoId: youtubeSearchResults,
          venue,
          // address: venue.formatted_address,
          // location,
          start,
          // end,
          distance,
          ticketsLink: url,
        };
        // const artistSearchResults = await spotifyArtistSearch({
        //   title: titleScrubbed,
        //   spotifyToken,
        // });
        // if (!artistSearchResults || artistSearchResults.length === 0) return;
        // const artist = artistSearchResults[0];
        // const topTracks = await spotifyArtistTopTracks({ artistId: artist.id, spotifyToken });
        // if (!topTracks || topTracks.length === 0) return;
        // const tracksToAddtoPlaylist = topTracks.length > 3 ? topTracks.slice(0, 3) : topTracks;
        // const tracksPayload =
        //   tracksToAddtoPlaylist?.map((track) => ({
        //     track: {
        //       id: track.id,
        //       name: track.name,
        //       uri: track.uri,
        //       href: track.href,
        //       external_urls: track.external_urls
        //     },
        //     album: {
        //       id: track.album.id,
        //       name: track.album.name,
        //       uri: track.album.uri,
        //       images: track.album.images,
        //       href: track.album.href,
        //       external_urls: track.album.external_urls
        //     },
        //     artist: {
        //       id: track.artists[0].id,
        //       name: track.artists[0].name,
        //       href: track.artists[0].href,
        //       uri: track.artists[0].uri,
        //       external_urls: track.artists[0].external_urls
        //     },
        //     venue: venue.name,
        //     address: venue.formatted_address,
        //     location,
        //     start,
        //     end,
        //     distance,
        //     spotifyToken,
        //     ticketPriceRange: [],
        //     ticketsLink: `https://www.google.com/search?q=${title}+tickets`,
        //   })) || [];
        // console.log(payload);
        return payload;
      })
    );
    // const playlist = [].concat.apply([], p.filter((e) => !!e))
    console.log(playlist);
    return playlist.filter(item => item !== undefined);
  } catch (e) {
    throw new Error(`getPlaylist error: ${e.message}`);
  }
};

module.exports = {
  getPlaylist,
};
