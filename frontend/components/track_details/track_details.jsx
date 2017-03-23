import React from "react";
import CommentsIndexContainer from "../comments/comments_index_container";
import CommentFormContainer from "../comments/comment_form_container";
import { Link } from "react-router";

class TrackDetails extends React.Component {
  constructor(props) {
    super(props);
    this.playPauseTrack = this.playPauseTrack.bind(this);
    this.showEditTitle = this.showEditTitle.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.saveTitle = this.saveTitle.bind(this);
    this.changePicture = this.changePicture.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.submitChanges = this.submitChanges.bind(this);
    this.cancelChanges = this.cancelChanges.bind(this);
    this.state = {
      paused: true,
      editing: false,
      title: "",
      imageUrl: "",
      imageFile: null,
      savedTitle: "",
      savedImageUrl: "",
      savedImageFile: null,
      darkestColor: "",
      lightestColor: ""
    }
  }

  cancelChanges() {
    this.setState({
      title: this.state.savedTitle,
      imageUrl: this.state.savedImageUrl,
      imageFile: this.state.savedImage
    })
  }

  submitChanges() {
    if (this.state.title === "") {
      return;
    }
    let formData = new FormData();
    formData.append("track[title]", this.state.title);
    formData.append("track[image]", this.state.imageFile)
    this.props.updateTrack(this.props.params.trackId, formData).then(() => {
        this.setState({
          savedTitle: this.state.title,
          savedImageUrl: this.state.imageUrl,
          savedImageFile: this.state.imageFile
        });
      }
    );
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.saveTitle(e);
    }
  }

  saveTitle(e) {
    this.setState({ editing: false });
    this.submitChanges();
  }

  showEditTitle(e) {
    this.setState({ editing: true });
  }

  changeTitle(e) {
    this.setState({ title: e.currentTarget.value });
  }

  playPauseTrack() {
    this.props.playPauseTrack(this.props.track);
    this.setState({
      paused: !this.state.paused,
    });

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

  componentDidMount() {

  }

  componentWillReceiveProps(newProps) {
    if (newProps.params.trackId !== this.props.params.trackId) {
      this.props.fetchTrack(newProps.params.trackId);
    }
    if (!!newProps.track) {
      // this.wavesurfer = WaveSurfer.create({
      //   container: "#root",
      //   waveColor: 'red',
      //   progressColor: 'purple'
      // });
      // this.wavesurfer.load(newProps.track.musicUrl);

      // let darkestColor = [255, 255, 255];
      // let darkestColorSum = 765;
      // let lightestColor = [0, 0, 0];
      // let lightestColorSum = 0;
      // let dominantColors = newProps.track.dominantColors;
      // for (let i = 0; i < dominantColors.length; i++) {
      //   let sum = dominantColors[i].reduce((a, b) => parseInt(a) + parseInt(b), 0);;
      //   if ((sum < 60) || (sum > 705)) {
      //     continue;
      //   }
      //
      //   if (sum < darkestColorSum) {
      //     darkestColorSum = sum;
      //     darkestColor = dominantColors[i];
      //   }
      //   if (sum > lightestColorSum) {
      //     lightestColorSum = sum;
      //     lightestColor = dominantColors[i];
      //   }
      // }
      //
      // if (Math.abs(darkestColorSum - lightestColorSum) < 50) {
      //   darkestColor = [71, 66, 66];
      //   lightestColor = [180, 132, 110];
      // }

      this.setState({ title: newProps.track.title,
                      savedTitle: newProps.track.title,
                      imageUrl: newProps.track.imageUrl,
                      savedImageUrl: newProps.track.imageUrl,
                      imageFile: newProps.track.imageFile,
                      savedImageFile: newProps.track.imageFile,
                      darkestColor: `rgb(${newProps.track.dominantColors[0].join(", ")})`,
                      lightestColor: `rgb(${newProps.track.dominantColors[1].join(", ")})`
                    });

      if (!!newProps.currentTrack) {
        // console.log(newProps.currentTrackPlaying);
        if (newProps.currentTrack.id === newProps.track.id) {
          this.setState({
            paused: !newProps.currentTrackPlaying
          });
        } else {
          this.setState({
            paused: true,
          });
        }
      }
    }
  }

  componentWillMount() {
    this.props.fetchTrack(this.props.params.trackId);
    // this.setState({imageUrl: this.props.track.imageUrl});
  }

  render() {
    let track = this.props.track;

    if (!track) {
      return null;
    }


    let imgSrc = this.state.imageUrl;

    let imgWrapper =  <div className="details-img-wrapper">
                        <img className="details-img" src={imgSrc}></img>
                      </div>;
    let titleWrapper = <div className="details-title-wrapper"><span className="details-title">{track.title}</span></div>;
    if (this.props.userId === track.artistId) {
      imgWrapper = <div className="details-img-wrapper">
        <input id="details-img-input" className="hidden" type="file" accept="image/*" onChange={this.changePicture} />
        <label htmlFor="details-img-input" className="details-img-label"><i className="fa fa-camera" aria-hidden="true"></i></label>
        <img className="details-img" src={imgSrc}></img>
      </div>;

      let html = `${track.title}`;

      if (this.state.editing) {
        titleWrapper =  <div className="details-title-wrapper">
                          <input value={this.state.title} autoFocus onKeyPress={this.handleKeyPress} onBlur={this.saveTitle} className="details-title-input" type="text" onChange={this.changeTitle} />
                        </div>;
      } else {
        titleWrapper =  <div className="details-title-wrapper">
                          <span className="details-title">{this.state.title}</span>
                          <input id="details-title-input" className="hidden" type="text" onChange={this.changeTitle} />
                          <label onClick={this.showEditTitle} htmlFor="details-title-input" className="details-title-label"><i className="fa fa-pencil" aria-hidden="true"></i></label>
                        </div>;
      }

    }

    let playPauseIcon = <i className="fa fa-play details-play" aria-hidden="true"></i>;
    if (!this.state.paused) {
      playPauseIcon = <i className="fa fa-pause details-pause" aria-hidden="true"></i>;
    }

    // console.log(this.state);
    let bannerBackground = {
      background: `linear-gradient(135deg, ${this.state.darkestColor} 0%, ${this.state.lightestColor} 100%)`
    };
    // console.log(bannerBackground);

    return  <div className="home-body">
              <div className="margin-div"></div>
              <div className="track-details-div">
                <div className="track-details-banner" style={bannerBackground}>
                  <div className="details-left">
                    <div className="details-play-pause" onClick={this.playPauseTrack}>
                      {playPauseIcon}
                    </div>
                    <div className="details-text">
                      <span className="details-artist-name"><Link className="track-details-link" to={`/profile/${track.artistId}`}>{track.artistName}</Link></span>
                      {titleWrapper}
                    </div>
                  </div>
                  {imgWrapper}
                </div>
                <div className="comments-div" >
                  <CommentFormContainer commentType="Track" commentableId={track.id}/>
                  <CommentsIndexContainer commentType="Track" commentableId={track.id} userId={this.props.userId}/>
                </div>
              </div>
              <div className="margin-div"></div>
            </div>
  }
}

export default TrackDetails;
