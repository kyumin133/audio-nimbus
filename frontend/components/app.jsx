import React from 'react';
import NavBarContainer from './nav_bar/nav_bar_container';

class App extends React.Component {
  render() {
    let header = <header>
      <div className="logo">
        <img src="assets/logo.svg"></img>
      </div>
      < NavBarContainer />
    </header>;
    return <div>
      { header }
      { this.props.children }
    </div>
  }
};

export default App;
