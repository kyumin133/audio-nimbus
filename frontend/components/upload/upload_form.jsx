import React from "react";
import { withRouter } from "react-router";
import ReactModal from "react-modal";
import UserAPIUtil from "../../util/user_api_util";

class UploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.changePicture = this.changePicture.bind(this);
    this.changeMusic = this.changeMusic.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.cancel = this.cancel.bind(this);
    this.state = {
      title: "",
      imageUrl: "",
      imageFile: null,
      musicUrl: "",
      musicFile: null,
      musicFileName: "Select Song",
      artistId: this.props.currentUser.id,
      showUploadModal: false,
      error: ""
    }
  }

  cancel() {
    this.props.router.push("/home")
  }

  update(id) {
    return (e) => {
      this.setState({[id]: e.currentTarget.value});
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if ((this.state.title === "") || (this.state.musicUrl === "")) {
      return;
    }

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
      this.setState({ musicUrl: reader.result, musicFile: file, musicFileName: file.name});
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ musicUrl: "", musicFile: null, musicFileName: "Select Song" });
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

  componentWillReceiveProps(newProps) {
    if (newProps.uploading) {
      this.setState({ showUploadModal: true });
    } else {
      this.setState({ showUploadModal: false });
    }
  }

  render() {
    let pic = "";


    let imgSrc = this.state.imageUrl;
    if(imgSrc.length === 0) {
      imgSrc = "/assets/track.jpeg";
    }

    let submitUpload = <input type="submit" className="submit-upload" value="Upload"></input>;
    if ((this.state.title === "") || (this.state.musicUrl === "" )) {
      submitUpload =  <input type="submit" disabled="disabled" className="submit-upload-disabled" value="Upload"></input>;
    }

    // console.log(this.state.showUploadModal);
    let modal = <ReactModal
         isOpen={this.state.showUploadModal}
         contentLabel="Upload Form modal"
         className="upload-modal" >
        <span className="uploading">Uploading...</span>
        <span className="music-spinner"><i className="fa fa-music" aria-hidden="true"></i></span>
      </ReactModal>;

    let imgLabel = (this.state.showUploadModal) ? "" : <label htmlFor="upload-img-input" className="upload-img-label"><i className="fa fa-camera" aria-hidden="true"></i></label>
    return  <div className="home-body">
              <div className="margin-div"></div>
              <div className="upload-page">
                {modal}
                <form className="upload-form" onSubmit={this.handleSubmit}>
                  <div className="track-data">
                    <div className="upload-form-left">
                      <input id="upload-img-input" className="upload-img-input" type="file" accept="image/*" onChange={this.changePicture} />
                      {imgLabel}
                      <img className="upload-img" src={imgSrc}></img>
                    </div>
                    <div className="upload-form-right">
                      <input type="text" className="box" autoFocus value={this.state.title} onChange={this.update("title")} placeholder="Title"></input>
                      <input type="file" className="upload-music-input" id="upload-music-input" accept="audio/mpeg3" onChange={this.changeMusic} />
                      <label htmlFor="upload-music-input" className="upload-music-label box">{this.state.musicFileName}</label>
                      <div className="upload-form-buttons">
                        <button type="button" onClick={this.cancel} className="cancel-upload">Cancel</button>
                        {submitUpload}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="margin-div"></div>
            </div>
  }
}

export default withRouter(UploadForm);
