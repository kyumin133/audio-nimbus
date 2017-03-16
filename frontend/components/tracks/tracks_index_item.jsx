import React from "react";

class TracksIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.playTrack = this.playTrack.bind(this);
  }

  playTrack() {
    this.props.playTrack(this.props.track);
  }


  render() {
    let track = this.props.track;
    return  <li>
              <img className="index-img" src={track.imageUrl}></img>
              <div className="play-circle" onClick={this.playTrack}>
                <i className="fa fa-play" aria-hidden="true"></i>
              </div>
              {track.title}
            </li>
  }
}

export default TracksIndexItem;
