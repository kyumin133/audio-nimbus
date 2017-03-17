import React from "react";

class TrackDetails extends React.Component {
  render() {
    let track = this.props.track;
    return  <div className="selected-track-li">
              <img className="index-img" src={track.imageUrl}></img>
              <div className="track-info">
                <span className="track-info-artist">{track.artistName}</span>
                <span className="track-info-title">{track.title}</span>
              </div>
            </div>
  }
}

export default TrackDetails;
