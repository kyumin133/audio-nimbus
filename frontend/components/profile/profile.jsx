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
    this.select = this.select.bind(this);
    this.state = {
      username: "",
      imageUrl: "",
      imageFile: null,
      savedUsername: "",
      savedImageUrl: "",
      savedImageFile: null,
      editing: false,
      saving: false,
      darkestColor: "",
      lightestColor: "",
      hidden: true,
      errors: []
    };

    // this.saving = false;
  }

  select(e) {
    e.currentTarget.select();
  }

  cancelChanges() {
    let errors = this.state.editing ? this.state.errors : []
    this.setState({
      username: this.state.savedUsername,
      imageUrl: this.state.savedImageUrl,
      imageFile: this.state.savedImageFile,
      editing: false,
      saving: false,
      errors: errors
    })
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      // e.preventDefault();
      this.saveUsername(e);
    }
  }

  saveUsername(e) {
    // this.saving = true;
    // this.forceUpdate(() => {
    //   console.log(this.saving);
    //   this.submitChanges(e);
    // });

    this.setState({
      saving: true
    });

    this.submitChanges(e);
    // this.setState({ editing: false });
  }

  changeUsername(e) {
    let errors = [];
    if (e.currentTarget.value.length === 0) {
      errors = ["Username can't be blank"]
    }
    this.setState({
      username: e.currentTarget.value,
      errors: errors
    });
  }

  showEditUsername() {
    this.setState({ editing: true });
  }

  submitChanges(e) {
    // e.preventDefault();
    if ((this.state.username === "") || (this.state.errors.length > 0)) {
      this.cancelChanges();
      return;
    }
    if ((this.state.imageUrl === this.state.savedImageUrl) && (this.state.username === this.state.savedUsername)) {
      this.cancelChanges();
      return;
    }

    let formData = new FormData();
    formData.append("user[username]", this.state.username);
    formData.append("user[image]", this.state.imageFile)
    this.props.updateUser(this.props.params.userId, formData).then(() => {
        this.setState({
          savedUsername: this.state.username,
          savedImageUrl: this.state.imageUrl,
          savedImageFile: this.state.imageFile,
          editing: false,
          saving: false,
          errors: []
        });
      }
    ).fail((errors) => {
      let errorArr = errors.responseJSON;
      if (errorArr === undefined) {
        errorArr = [];
      }
      // this.saving = false;
      this.setState({
        editing: true,
        saving: false,
        errors: errors.responseJSON
      })
    });
  }

  changePicture(e) {
    var reader = new FileReader();
    var file = e.currentTarget.files[0];
    reader.onloadend = function() {
      this.setState({ imageUrl: reader.result, imageFile: file});
      this.submitChanges(e);
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

  componentWillReceiveProps(newProps) {
    if ((!!newProps.user.imageUrl) && (newProps.user.imageUrl !== this.state.imageUrl)) {
      this.setState({
        imageUrl: newProps.user.imageUrl,
        imageFile: newProps.user.imageFile
      });
    }
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
        savedUsername: newProps.user.username,
        savedImageUrl: newProps.user.imageUrl,
        savedImageFile: newProps.user.imageFile,
        darkestColor: `rgb(${dominantColors[0].join(", ")})`,
        lightestColor: `rgb(${dominantColors[1].join(", ")})`,
        hidden: false
      });
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.params.userId !== this.props.params.userId) {
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

    let error = "";
    let profileUsernameInput = "profile-username-input";
    let editProfileUsernameWrapper = "edit-profile-username-wrapper";
    if (this.state.errors.length > 0) {
      error = <div className="profile-error">{this.state.errors[0]}</div>;
      profileUsernameInput = "profile-username-input-error"
      editProfileUsernameWrapper = "edit-profile-username-wrapper-error"
    }

    let imgWrapper =  <div className="profile-img-wrapper">
                        <div className="profile-img" style={{ backgroundImage: `url(${this.state.imageUrl})`}} ></div>
                      </div>;
    let usernameWrapper = <div className="profile-username-wrapper"><span className="profile-username">{this.state.username}</span></div>;

    if (this.props.currentUserId === user.id) {
      imgWrapper = <div className="profile-img-wrapper">
        <div className="profile-img" style={{ backgroundImage: `url(${this.state.imageUrl})`}} ></div>
        <input id="profile-img-input" className="hidden" type="file" accept="image/*" onChange={this.changePicture} />
        <label htmlFor="profile-img-input" className="profile-img-label"><i className="fa fa-camera" aria-hidden="true"></i></label>
      </div>;

      if (this.state.saving) {
        // console.log("saving!");
        usernameWrapper =   <div className="profile-username-wrapper">
                              <span className="profile-username-saving">
                                <span className="spinner"></span>
                              </span>
                            </div>;
      } else if (this.state.editing) {
        usernameWrapper =   <div className={editProfileUsernameWrapper}>
                              <div className="profile-username-wrapper">
                                <input value={this.state.username} autoFocus onFocus={this.select} onKeyPress={this.handleKeyPress} onBlur={this.saveUsername} className={profileUsernameInput} type="text" onChange={this.changeUsername} />
                              </div>
                              {error}
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
                  <div className="profile-tracks-title">Uploaded Tracks</div>
                  <TracksIndexContainer userId={user.id} showArtist={false} />
                </div>
              </div>
              <div className="margin-div"></div>
            </div>;
  }
}

export default Profile;
