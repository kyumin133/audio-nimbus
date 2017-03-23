import React from "react";
import TracksIndexItem from "./tracks_index_item";

class TracksIndex extends React.Component {
  constructor(props) {
    super(props);
    this.loadTracks = this.loadTracks.bind(this);
    this.state = {
      hidden: true
    };
  }

  componentDidMount() {
    this.props.fetchTracks(this.props.userId).then(() => {
      this.setState({
        hidden: false
      });
    });
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.tracks) {
      this.setState({
        hidden: true
      })
    } else if ((this.props.userId !== newProps.userId) || (this.props.tracks.length !== newProps.tracks.length)) {
      this.loadTracks(newProps);
    } else if ((!!this.props.tracks[0]) && (newProps.tracks[0])) {
      if (this.props.tracks[0].id !== newProps.tracks[0].id) {
        this.loadTracks(newProps);
      }
    }
  }

  loadTracks(newProps) {
    this.setState({
      hidden: true
    })
    this.props.fetchTracks(newProps.userId).then(() => {
      this.setState({
        hidden: false
      })
    })
  }

  render() {
    if ((this.props.tracks === undefined) || (this.state.hidden)) {
      return null;
    }
    if (this.props.tracks.length === 0) {
      return <div className="no-tracks-found">No Tracks</div>
    }

    // console.log(this.props.tracks);

    let tracksArr = this.props.tracks.map((track, idx) => {
      return <TracksIndexItem playPauseTrack={this.props.playPauseTrack} key={track.id} track={track} currentTrack={this.props.currentTrack} currentTrackPlaying={this.props.currentTrackPlaying} showArtist={this.props.showArtist}></TracksIndexItem>;
    });
    return <ul className="track-index">{tracksArr}</ul>;
  }
}

export default TracksIndex;
