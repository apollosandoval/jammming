const clientID = 'a81bc212ef65494cbcc4c21042a8df8e'; // developer's clientID
const redirectURI = 'http://localhost:3000/';
let accessToken; // holds user's access token

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (tokenMatch && expiresInMatch) {
      accessToken = tokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn*1000);
      window.history.pushState('AccessToken', null, '/');
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = accessUrl
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
        return response.json();
      }
      throw new Error('Request Failed!')
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
    }).catch(error => {
      console.log(error);
    })
  }, // end of search()
  savePlaylist(playlistName, trackURIs) {
    if (!playlistName || !trackURIs) {
      return;
    }
    const accessToken = Spotify.getAccessToken;
    const headers = {Authorization: `Bearer ${accessToken}`};
    let userID;

    return fetch('https://api.spotify.com/v1/me', {headers: headers}
  ).then(response => {
    return response.json();
  })
  } // end of savePlaylist()
};

export default Spotify;
