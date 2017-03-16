import React from "react";

class Audio extends React.Component {
  render() {
    let track = this.props.track;
    if (!track) {
      return null;
    }
    return  <div className="audio">
              <audio id="audio" src={track.musicUrl} controls autoPlay="true"></audio>
            </div>
  }
}

export default Audio;
