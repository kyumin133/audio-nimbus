import React from "react";
import TracksIndexContainer from "../tracks/tracks_index_container";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.updateUser = this.updateUser.bind(this);
    this.changePicture = this.changePicture.bind(this);
    this.submitChanges = this.submitChanges.bind(this);
    this.showEditUsername = this.showEditUsername.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.saveUsername = this.saveUsername.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.cancelChanges = this.cancelChanges.bind(this);
    this.state = {
      username: "",
      imageUrl: "",
      imageFile: null,
      savedUsername: "",
      savedImageUrl: "",
      savedImageFile: null,
      editing: false,
      darkestColor: "",
      lightestColor: "",
      hidden: true
    };
  }

  cancelChanges() {
    this.setState({
      username: this.state.savedUsername,
      imageUrl: this.state.savedImageUrl,
      imageFile: this.state.savedImage
    })
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.saveUsername(e);
    }
  }

  saveUsername(e) {
    this.setState({ editing: false });
    this.submitChanges();
  }

  changeUsername(e) {
    this.setState({ username: e.currentTarget.value });
  }

  showEditUsername() {
    this.setState({ editing: true });
  }

  submitChanges() {
    if (this.state.username === "") {
      return;
    }
    let formData = new FormData();
    formData.append("user[username]", this.state.username);
    formData.append("user[image]", this.state.imageFile)
    this.props.updateUser(this.props.params.userId, formData).then(() => {
        this.setState({
          savedUsername: this.state.username,
          savedImageUrl: this.state.imageUrl,
          savedImageFile: this.state.imageFile
        });
      }
    );
  }

  changePicture(e) {
    var reader = new FileReader();
    var file = e.currentTarget.files[0];
    reader.onloadend = function() {
      this.setState({ imageUrl: reader.result, imageFile: file});
      this.submitChanges();
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ imageUrl: this.state.savedImageUrl, imageFile: this.state.savedImageFile });
    }
  }

  componentWillMount() {
    this.props.fetchUser(this.props.params.userId);
  }

  updateUser(newProps) {
    // let darkestColor = [255, 255, 255];
    // let darkestColorSum = 765;
    // let lightestColor = [0, 0, 0];
    // let lightestColorSum = 0;
    let dominantColors = newProps.user.dominantColors;
    if (!!dominantColors) {
      this.setState({
        username: newProps.user.username,
        imageUrl: newProps.user.imageUrl,
        imageFile: newProps.user.imageFile,
        darkestColor: `rgb(${dominantColors[0].join(", ")})`,
        lightestColor: `rgb(${dominantColors[1].join(", ")})`,
        hidden: false
      });
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.params.userId !== this.props.params.userId) {
      console.log("change!!");
      this.props.fetchUser(newProps.params.userId).then(() => {
        this.updateUser(this.props);
      });
    }
    if (!!newProps.user) {
      this.updateUser(newProps);
    } else {
      this.setState({
        hidden: true
      })
    }
  }

  render() {
    let user = this.props.user;
    if ((!user) || (this.state.hidden)) {
      return null;
    }

    let imgWrapper =  <div className="profile-img-wrapper">
                        <img className="profile-img" src={this.state.imageUrl}></img>
                      </div>;
    let usernameWrapper = <div className="profile-username-wrapper"><span className="profile-username">{this.state.username}</span></div>;
    if (this.props.currentUserId === user.id) {
      imgWrapper = <div className="profile-img-wrapper">
        <input id="profile-img-input" className="hidden" type="file" accept="image/*" onChange={this.changePicture} />
        <label htmlFor="profile-img-input" className="profile-img-label"><i className="fa fa-camera" aria-hidden="true"></i></label>
        <img className="profile-img" src={this.state.imageUrl}></img>
      </div>;

      if (this.state.editing) {
        usernameWrapper =  <div className="profile-username-wrapper">
                          <input value={this.state.username} autoFocus onKeyPress={this.handleKeyPress} onBlur={this.saveUsername} className="profile-username-input" type="text" onChange={this.changeUsername} />
                        </div>;
      } else {
        usernameWrapper =  <div className="profile-username-wrapper">
                          <span className="profile-username">{this.state.username}</span>
                          <input id="profile-username-input" className="hidden" type="text" onChange={this.changeUsername} />
                          <label onClick={this.showEditUsername} htmlFor="profile-username-input" className="profile-username-label"><i className="fa fa-pencil" aria-hidden="true"></i></label>
                        </div>;
      }

    }

    let bannerBackground = {
      background: `linear-gradient(135deg, ${this.state.lightestColor} 0%, ${this.state.darkestColor} 100%)`
    };

    return  <div className="home-body">
              <div className="margin-div"></div>
              <div className="profile-div">
                <div className="profile-banner" style={bannerBackground}>
                  {imgWrapper}
                  {usernameWrapper}
                </div>
                <div className="profile-tracks">
                  <TracksIndexContainer userId={user.id} showArtist={false} />
                </div>
              </div>
              <div className="margin-div"></div>
            </div>;
  }
}

export default Profile;
