# FetchMapSearchResults.js
Calling FetchMapSearchResults.js with the user's search query will return an array of search locations 
that google expects to match the users query (example response below). The main fields that should be looked at are description
and place_id. The description is what the user should see as an option. When the user selects an 
option, the place_id should be sent to FetchPlaylist to fetch the playlist
[
    {
        "description": "Thousand Oaks, CA 91362, USA",
        "place_id": "ChIJ3ymuH3Il6IARxrIIxMs0gDI"
        ...
    }
]

# FetchPlaylist.js
Given a Google place_id (see above notes on FetchMapSearchResults.js), a playlist will be returned.
Here is an example response.
[
    {
        "track": {
            "id": "32M5CgyOmMJA5vzTQirbGr",
            "name": "Bradley",
            "uri": "spotify:track:32M5CgyOmMJA5vzTQirbGr",
            "href": "https://api.spotify.com/v1/tracks/32M5CgyOmMJA5vzTQirbGr"
        },
        "album": {
            "id": "71tPWkpLU4nXoyM2i4Q1ax",
            "name": "Bradley",
            "uri": "spotify:album:71tPWkpLU4nXoyM2i4Q1ax",
            "images": [
                {
                    "height": 640,
                    "url": "https://i.scdn.co/image/ab67616d0000b2739d468a17f5e6c40a3e9d2aee",
                    "width": 640
                },
            ],
            "href": "https://api.spotify.com/v1/albums/71tPWkpLU4nXoyM2i4Q1ax"
        },
        "artist": {
            "id": "4hgvJQ6te9I2VRBatFbhov",
            "name": "Casey Ahern",
            "href": "https://api.spotify.com/v1/artists/4hgvJQ6te9I2VRBatFbhov",
            "uri": "spotify:artist:4hgvJQ6te9I2VRBatFbhov"
        },
        "venue": "Five07 Coffee Bar and Eatery",
        "address": "2036 Avenida de Los Arboles, Unit C\nThousand Oaks, CA 91362\nUnited States of America",
        "location": [
            -118.84164,
            34.20995
        ],
        "start": "2021-07-18T03:00:00Z",
        "end": "2021-07-18T03:00:00Z",
        "distance": "3.7 mi",
        "spotifyToken": "BQDwmo-Bti3LSKtb3UiPgFwpDEmXBku6q_S9AnD8j9st6GzTxlZaX2BNcxsZOI7ah5JxtAA7gGXlQlW-jZw",
        "ticketPriceRange": [],
        "ticketsLink": "https://www.google.com/search?q=Casey Ahern+tickets"
    },
]