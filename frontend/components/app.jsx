import AudioContainer from "./audio/audio_container";
import React from 'react';
import NavBarContainer from './nav_bar/nav_bar_container';
import { Link, withRouter } from 'react-router';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.goHome = this.goHome.bind(this);
  }

  goHome(e) {
    this.props.router.push("/");
  }
  render() {
    let header = <header>
      <div className="logo" onClick={this.goHome}>
        <img src="assets/cloud.png"></img>
      </div>
      < NavBarContainer />
    </header>;

    let footer = null;
    let audio = <AudioContainer />;
    if (!window.currentUser) {
      footer = <footer>
        <div className="img-src">Icon made by <a href="http://www.flaticon.com/authors/anhgreen" title="anhgreen">anhgreen</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a></div>
        <div className="img-src">
          Music provided by <a href="http://incompetech.com/music/royalty-free/">Incompetech</a> <br />
          Licensed under <a href="http://creativecommons.org/licenses/by/3.0/">Creative Commons</a>: By Attribution 3.0 <br />
        </div>
        <div className="img-src">
          Created by Ken (Kyumin) Lee
          <a className="job-link" href="https://github.com/kyumin133/audio-nimbus"><i className="fa fa-github" aria-hidden="true"></i></a>
          <a className="job-link" href="https://www.linkedin.com/in/kenneth-kyumin-lee-10918922"><i className="fa fa-linkedin-square" aria-hidden="true"></i></a>
        </div>
      </footer>;
      audio = null;
    }

    return <div>
      { header }
      <div className="body-audio">
        { this.props.children }
        {audio}
      </div>
      { footer }
    </div>
  }
};

export default withRouter(App);
