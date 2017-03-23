import React from "react";
import TracksIndexContainer from "./tracks/tracks_index_container";
import AudioContainer from "./audio/audio_container";

class HomeAfterLogin extends React.Component {
  render() {
    return  <div className="home-body">
              <div className="margin-div"></div>
              <div className="main-div">
                <div className="home">
                  <div className="home-title-wrapper">
                    <div className="home-title">All Tracks</div>
                    <div className="home-title-remainder"></div>
                  </div>
                  <div className="home-track-index">
                    <TracksIndexContainer userId={-1} showArtist={true}/>
                  </div>
                </div>
              </div>
              <div className="margin-div"></div>
            </div>
  }
}

export default HomeAfterLogin;
