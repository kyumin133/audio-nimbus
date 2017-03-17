import React from "react";
import ReactModal from "react-modal";
import UserAuthMain from '../user_auth/user_auth_main';
import { Link, withRouter } from "react-router";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };

    this.logout = this.logout.bind(this);
    ReactModal.defaultStyles.overlay.backgroundColor = 'none';
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.loginDemo = this.loginDemo.bind(this);
  }

  loginDemo() {
    this.props.login({
      email: "demo@demo.com",
      password: "password"
    }).then(() => {
      this.props.router.push("/home");
    });
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
  logout() {
    this.props.logout().then(() => {
      this.props.stopTrack();
    });
  }

  render() {
    let loggedIn = !!window.currentUser;

    if (loggedIn) {
      return  <nav>
                <ul>
                  <Link to={"/upload"}><li className="demo">Upload</li></Link>
                  <Link to={"/edit_profile"}><li>Profile</li></Link>
                  <li onClick={this.logout}>Sign Out</li>
                </ul>
              </nav>;
    } else {
      return  <nav>
                <ul>
                  <li onClick={this.loginDemo} className="demo">Demo</li>
                  <li onClick={this.handleOpenModal}>Login</li>
                  <li onClick={this.handleOpenModal}>Sign Up</li>
                </ul>
                <ReactModal
                   isOpen={this.state.showModal}
                   contentLabel="User Auth modal"
                   className="modal"
                   onRequestClose={this.handleCloseModal} >
                   <div className="close-modal" onClick={this.handleCloseModal}>
                     &#x2573;
                   </div>
                  <UserAuthMain handleCloseModal={this.handleCloseModal} firstLoad={true}></UserAuthMain>
                </ReactModal>
              </nav>;
    }
  }
}

export default withRouter(NavBar);
