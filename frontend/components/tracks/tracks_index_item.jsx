import React from "react";

class TracksIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.playPauseTrack = this.playPauseTrack.bind(this);
    this.state = {
      selected: false,
      paused: true
    }
  }

  playPauseTrack() {
    this.props.playPauseTrack(this.props.track);
    this.setState({
      paused: !this.state.paused,
      selected: true
    });

  }

  componentWillMount() {
    if (this.props.currentTrack !== null) {
      if (this.props.currentTrack.id === this.props.track.id) {
        // console.log(this.props.currentTrackPlaying);
        this.setState({
          selected: true,
          paused: !this.props.currentTrackPlaying
        })
      }
    }
  }
  componentWillReceiveProps(newProps) {
    if (newProps.currentTrack !== null) {
      if (newProps.currentTrack.id === this.props.track.id) {
        this.setState({
          paused: !newProps.currentTrackPlaying,
          selected: true
        });
      } else {
        this.setState({
          paused: true,
          selected: false
        });
      }
    } else {
      this.setState({
        paused: true,
        selected: false
      });
    }
  }


  render() {
    let track = this.props.track;
    let playPauseIcon = <i className="fa fa-play index-play" aria-hidden="true"></i>;
    let divName = "unselected-circle";
    let liClass = "track-index-item";
    if (this.state.selected) {
      divName = "selected-circle";
      liClass = "track-index-item selected-track-li";
    }
    // console.log(this.state);
    if (!this.state.paused) {
      playPauseIcon = <i className="fa fa-pause index-pause" aria-hidden="true"></i>;
    }
    return  <li className={liClass}>
              <img className="index-img" src={track.imageUrl}></img>
              <div className={divName} onClick={this.playPauseTrack}>
                {playPauseIcon}
              </div>
              <div className="track-info">
                <span className="track-info-artist">{track.artistName}</span>
                <span className="track-info-title">{track.title}</span>
              </div>
            </li>
  }
}

export default TracksIndexItem;
