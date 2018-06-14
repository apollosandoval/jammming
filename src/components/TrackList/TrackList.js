import React from 'react';
import ReactDOM from 'react-dom';
import Track from '../Track/Track.js';
import './TrackList.css';

class TrackList extends React.Component {
  render() {
    return(
      <div className="TrackList">
        {this.props.tracks.map(track => {
          return <Track track={track} key={track.id} />;
        })}
      </div>
    );
  }
}

export default TrackList;
