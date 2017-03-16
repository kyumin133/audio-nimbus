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
      return <TracksIndexItem playTrack={this.props.playTrack} key={idx} track={track}></TracksIndexItem>;
    });
    return <ul>{tracksArr}</ul>;
  }
}

export default TracksIndex;
