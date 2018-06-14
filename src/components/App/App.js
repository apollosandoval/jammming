import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js'
import SearchResults from '../SearchResults/SearchResults.js'
import Playlist from '../Playlist/Playlist.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          name: 'name1',
          artist: 'artist1',
          album: 'album1',
          id: 1
        },
        {
          name: 'name2',
          artist: 'artist2',
          album: 'album2',
          id: 2
        },
        {
          name: 'name3',
          artist: 'artist3',
          album: 'album3',
          id: 3
        }
      ], // end of searchResults object
      playlistName: 'test playlist',
      playlistTracks: [
        {
          name: 'name4',
          artist: 'artist4',
          album: 'album4',
          id: 4
        },
        {
          name: 'name5',
          artist: 'artist5',
          album: 'album5',
          id: 5
        },
        {
          name: 'name3',
          artist: 'artist3',
          album: 'album3',
          id: 3
        }
      ] // end of playlistTracks
    } // end of this.state

    this.addTrack=this.addTrack.bind(this);
    this.removeTrack=this.removeTrack.bind(this);

  }; // end of constructor method
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
    this.state.playlistTracks = this.state.playlistTracks.filter(savedTrack => savedTrack.id != track.id);
    this.setState({playlistTracks: this.state.playlistTracks});
  } // end of removeTrack()
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults} />
            <Playlist onRemove={this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
