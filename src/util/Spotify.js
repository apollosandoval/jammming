let accessToken = ''; // holds user's access token
const clientID = 'a81bc212ef65494cbcc4c21042a8df8e'; // developer's clientID
const redirectURI = 'http://localhost:3000/';

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    } else {
      const tokenMatch = window.location.href.match(/access_token=([^&]*)/); // parses the url for access token
      const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/); // parses url for expires_in token match
      if (tokenMatch && expiresInMatch) {
        accessToken = tokenMatch[1]; // assigns the access token value returned from Spotify URL to our application
        const expiresIn = Number(expiresInMatch[1]);
        window.setTimeout(() => accessToken = '', expiresIn * 1000); // sets access token to expire after some time
        window.history.pushState(accessToken, null, '/'); // clears parameters from URL so app doesn't try grabbing the access token after it has expired
        return accessToken;
      } else if (!tokenMatch) {
        const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        window.location = accessUrl;
      }
    }
  }, // end of getAccessToken()
  search(term) {
    const accessToken = Spotify.getAccessToken();

    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      if (response.ok) {
        return response.json;
      }
      throw new Error('Request failed!');
    }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => (
        {
          ID: track.id,
          Name: track.name,
          Artist: track.artists[0].name,
          Album: track.album.name,
          URI: track.uri
        }
      ));
    })
  } // end of search()
};

export default Spotify;
