import React from "react";
import UserAPIUtil from "../../util/user_api_util"

class UploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.changePicture = this.changePicture.bind(this);
    this.changeMusic = this.changeMusic.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.state = {
      title: "",
      imageUrl: "",
      imageFile: null,
      musicUrl: "",
      musicFile: null,
      artistId: this.props.currentUser.id
    }
  }

  update(id) {
    return (e) => {
      this.setState({[id]: e.currentTarget.value});
    }
  }

  handleSubmit() {
    let formData = new FormData();
    formData.append("track[image]", this.state.imageFile);
    formData.append("track[music]", this.state.musicFile)
    formData.append("track[artist_id]", this.props.currentUser.id)
    formData.append("track[title]", this.state.title)
    this.props.createTrack(formData);
  }

  changeMusic(e) {
    var reader = new FileReader();
    var file = e.currentTarget.files[0];

    reader.onloadend = function() {
      this.setState({ musicUrl: reader.result, musicFile: file});
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ musicUrl: "", musicFile: null });
    }
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

    let imgSrc = this.state.imageUrl;
    if(imgSrc.length === 0) {
      imgSrc = "/assets/track.jpeg";
    }

    return  <div className="home-body">
              <div className="margin-div"></div>
              <div className="upload-page">                
                <form className="upload-form" onSubmit={this.handleSubmit}>
                  <div className="track-data">
                    <div className="upload-form-left">
                      <input id="upload-img-input" className="upload-img-input" type="file" accept="image/*" onChange={this.changePicture} />
                      <label htmlFor="upload-img-input" className="upload-img-label"><i className="fa fa-camera" aria-hidden="true"></i></label>
                      <img className="upload-img" src={imgSrc}></img>
                    </div>
                    <div className="upload-form-right">
                      <input type="text" className="box" value={this.state.title} onChange={this.update("title")} placeholder="Title"></input>
                      <input type="file" className="upload-music-input" id="upload-music-input" accept="audio/mpeg3" onChange={this.changeMusic} />
                      <label htmlFor="upload-music-input" className="upload-music-label box">Select Song</label>
                      <div className="upload-form-buttons">
                        <button type="button" className="cancel-upload">Cancel</button>
                        <input type="submit" className="submit-upload" value="Upload"></input>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="margin-div"></div>
            </div>
  }
}

export default UploadForm;
