import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: [] // end of playlistTracks
    }; // end of this.state

    this.addTrack=this.addTrack.bind(this);
    this.removeTrack=this.removeTrack.bind(this);
    this.updatePlaylistName=this.updatePlaylistName.bind(this);
    this.savePlaylist=this.savePlaylist.bind(this);
    this.search=this.search.bind(this);

  } // end of constructor method
  addTrack(track) {
    if (
      this.state.playlistTracks.find(savedTrack => savedTrack.id===track.id)
    ) {
      return;
    }
    this.state.playlistTracks.push(track);
    this.setState({playlistTracks: this.state.playlistTracks});
  } // end of addTrack()
  removeTrack(track) {
    this.state.playlistTracks = this.state.playlistTracks.filter(savedTrack => savedTrack.id !== track.id);
    this.setState({playlistTracks: this.state.playlistTracks});
  } // end of removeTrack()
  updatePlaylistName(name) {
    this.setState({playlistName: name});
  } // end of updatePlaylistName()
  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(track => {return track.uri});
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  } // end of savePlaylist()
  search(searchTerm) {
    Spotify.search(searchTerm).then(results => {
      this.setState({searchResults: results});
    });
    console.log(this.state.searchResults);
  } // end of search()
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults} />
            <Playlist
              onRemove={this.removeTrack}
              onSave={this.savePlaylist}
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onNameChange={this.updatePlaylistName} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
