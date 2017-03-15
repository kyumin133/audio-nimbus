import React from 'react';
import ReactModal from 'react-modal';
import UserAuthMain from './user_auth/user_auth_main';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };

    ReactModal.defaultStyles.overlay.backgroundColor = 'none';
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }
  componentWillMount() {
    ReactModal.setAppElement('body');
  }

  render() {
    let loggedIn = this.props.route.loggedIn;
    let navBar;
    if (loggedIn) {

    } else {
      navBar =  <nav>
                  <ul>
                    <li className="demo">Demo</li>
                    <li onClick={this.handleOpenModal}>Login</li>
                    <li onClick={this.handleOpenModal}>Sign Up</li>
                  </ul>
                  <ReactModal
                     isOpen={this.state.showModal}
                     contentLabel="Minimal Modal Example"
                     className="modal"
                     onRequestClose={this.handleCloseModal} >
                     <div className="close-modal" onClick={this.handleCloseModal}>
                       x
                     </div>
                    <UserAuthMain handleCloseModal={this.handleCloseModal} firstLoad={true}></UserAuthMain>
                  </ReactModal>
                </nav>
    }
    let header = <header>
      <div className="logo">
        <img src="assets/logo.svg"></img>
      </div>
      {navBar}
    </header>;
    return <div>
      { header }
      { this.props.children }
    </div>
  }
};

export default App;
