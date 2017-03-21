import React from "react";
import TracksIndexItem from "./tracks_index_item";

class TracksIndex extends React.Component {
  componentDidMount() {
    this.props.fetchTracks();
  }

  render() {
    if (this.props.tracks === undefined) {
      return null;
    }
    if (this.props.tracks.length === 0) {
      return null;
    }

    // console.log(this.props.tracks);

    let tracksArr = this.props.tracks.map((track, idx) => {
      return <TracksIndexItem playPauseTrack={this.props.playPauseTrack} key={track.id} track={track} currentTrack={this.props.currentTrack} currentTrackPlaying={this.props.currentTrackPlaying}></TracksIndexItem>;
    });
    return <ul className="track-index">{tracksArr}</ul>;
  }
}

export default TracksIndex;
