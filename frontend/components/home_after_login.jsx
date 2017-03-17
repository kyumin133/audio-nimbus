import React from "react";
import TracksIndexContainer from "./tracks/tracks_index_container";
import AudioContainer from "./audio/audio_container";

class HomeAfterLogin extends React.Component {
  render() {
    return  <div className="home-body">
              <div className="margin-div"></div>
              <div className="main-div">
                <TracksIndexContainer />
              </div>
              <div className="margin-div"></div>
            </div>
  }
}

export default HomeAfterLogin;
