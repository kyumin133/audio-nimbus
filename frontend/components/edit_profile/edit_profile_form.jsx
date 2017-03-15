import React from "react";
import UserAPIUtil from "../../util/user_api_util"

class EditProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.changePicture = this.changePicture.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      imageUrl: "",
      imageFile: null
    }
  }

  handleSubmit() {
    let formData = new FormData();
    formData.append("user[image]", this.state.imageFile);
    UserAPIUtil.updateUser(this.props.currentUser.id, formData);
  }

  changePicture(e) {
    var reader = new FileReader();
    var file = e.currentTarget.files[0];
    reader.onloadend = function() {
      this.setState({ imageUrl: reader.result, imageFile: file});
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ imageUrl: "", imageFile: null });
    }
  }
  render() {
    let pic = "";
    let picClass = "profile-pic";
    if (this.state.imageUrl.length === 0) {
      picClass = "profile-pic hidden";
    }
    return  <form onSubmit={this.handleSubmit}>
              <div className="profile-pic-wrapper">
                <input type="file" accept="image/*" onChange={this.changePicture} />
                <img className={picClass} src={this.state.imageUrl}></img>
              </div>
              <input type="submit" value="Save"></input>
              <button type="button">Cancel</button>
            </form>;
  }
}

export default EditProfileForm;
