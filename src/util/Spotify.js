const accessToken = ''; // holds user's access token
const clientID = 'a81bc212ef65494cbcc4c21042a8df8e'; // developer's clientID
const redirectURL = 'http://localhost:3000/';

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const tokenMatch = window.location.href.match(/access_token=([^&]*)/); // parses the url for access token
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/); // parses url for expires_in token match
    if (tokenMatch && expiresIn) {
      accessToken = tokenMatch[1]; // assigns the access token value returned from Spotify URL to our application
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000); // sets access token to expire after some time
      window.history.pushState('Access Token', null, '/'); // clears parameters from URL so app doesn't try grabbing the access token after it has expired
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    window.location = accessUrl;
    }
  } // end of getAccessToken()
};

export default Spotify;
