const predictHQConcerts = require('./predictHQConcerts');
const spotifyArtistSearch = require('./spotifyArtistSearch');
const spotifyArtistTopTracks = require('./spotifyArtistTopTracks');

const getPlaylist = async location => {
  try {
    const concerts = await predictHQConcerts(location);
    const playlist = [];
    for (const concert of concerts) {
      const { entities, location, start, end, title } = concert;
      const artistSearchResults = await spotifyArtistSearch(title);
      if (artistSearchResults.length === 0) continue;
      const artist = artistSearchResults[0];
      const topTracks = await spotifyArtistTopTracks(artist.id);
      const tracksToAddtoPlaylist = topTracks.length > 3 ? topTracks.slice(0,3) : topTracks
      const venue = entities[0];
      playlist.push(
        ...tracksToAddtoPlaylist.map(track => ({
          track: {
            id: track.id,
            name: track.name,
            uri: track.uri,
            href: track.href
          },
          album: {
            id: track.album.id,
            name: track.album.name,
            uri: track.album.uri,
            images: track.album.images,
            href: track.album.href,
          },
          artist: {
            id: track.artists[0].id,
            name: track.artists[0].name,
            href: track.artists[0].href,
            uri: track.artists[0].uri,
          },
          venue: venue.name,
          address: venue.formatted_address,
          location,
          start,
          end,
          distance: 1.4,
          ticketPriceRange: [80, 210],
          ticketsLink: `https://www.google.com/search?q=${title}+tickets`
        }))
      );
    }
    return playlist;
  } catch (e) {
    throw new Error('getPlaylist error: ' + e.message);
  }
};

module.exports = {
  getPlaylist,
};
