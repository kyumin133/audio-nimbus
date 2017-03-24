import React from "react";
import CommentsIndexContainer from "../comments/comments_index_container";
import CommentFormContainer from "../comments/comment_form_container";
import Wavesurfer from 'react-wavesurfer';
import { Link } from "react-router";

class TrackDetails extends React.Component {
  constructor(props) {
    super(props);
    this.select = this.select.bind(this);
    this.playPauseTrack = this.playPauseTrack.bind(this);
    this.showEditTitle = this.showEditTitle.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.saveTitle = this.saveTitle.bind(this);
    this.changePicture = this.changePicture.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.submitChanges = this.submitChanges.bind(this);
    this.cancelChanges = this.cancelChanges.bind(this);
    this.seek = this.seek.bind(this);
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
      lightestColor: "",
      error: "",
      currentTime: 0,
      waveClass: "wavesurfer-hidden"
    }
  }

  seek(e) {
    if (!this.props.currentTrack) {
      // e.preventDefault();
      this.playPauseTrack();
      this.setState({
        currentTime: 0.1
      });
    } else if (this.props.currentTrack.id === this.props.track.id) {
      let currentPos = ( e.nativeEvent.offsetX / e.currentTarget.clientWidth )
      this.props.updateCurrentTimeByPos(currentPos);
      // this.setState({
      //   currentTime: 0.1
      // });
    } else {
      this.setState({
        currentTime: 0.1
      });
      this.playPauseTrack();
    }
  }

  select(e) {
    e.currentTarget.select();
  }

  cancelChanges() {
    this.setState({
      title: this.state.savedTitle,
      editing: false,
      imageUrl: this.state.savedImageUrl,
      imageFile: this.state.savedImage,
      error: ""
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
          savedImageFile: this.state.imageFile,
          error: ""
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
    if (e.currentTarget.value.length === 0) {
      this.cancelChanges();
      return;
    }
    this.setState({ editing: false });
    this.submitChanges();
  }

  showEditTitle(e) {
    this.setState({ editing: true });
  }

  changeTitle(e) {
    let error = ""
    if (e.currentTarget.value.length === 0) {
      error = "Title can't be blank"
    }
    this.setState({
      title: e.currentTarget.value,
      error: error
    });
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
        if (newProps.currentTrack.id === newProps.track.id) {
          this.setState({
            paused: !newProps.currentTrackPlaying,
            currentTime: newProps.currentTrack.currentTime
          });
        } else {
          this.setState({
            paused: true,
            currentTime: 0.1
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
        let inputClass = (this.state.error.length > 0) ? "details-title-input-error" : "details-title-input";
        titleWrapper =  <div className="details-title-wrapper">
                          <input value={this.state.title} autoFocus onFocus={this.select} onKeyPress={this.handleKeyPress} onBlur={this.saveTitle} className={inputClass} type="text" onChange={this.changeTitle} />
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

    let bannerBackground = {
      background: `linear-gradient(135deg, ${this.state.darkestColor} 0%, ${this.state.lightestColor} 100%)`
    };

    let waveOptions = {
      fillParent: true,
      height: 100,
      progressColor: '#f50',
      waveColor: '#c4c8dc',
      normalize: true,
      barWidth: 2,
      audioRate: 1,
      cursorWidth: 0,
      hideScrollbar: true
    };

    let waveOverlay = "";

    if (!!this.props.currentTrack) {
      if (this.props.currentTrack.id !== this.props.track.id) {
        // waveOverlay = <div className="wave-overlay" onClick={this.playPauseTrack}></div>
      }
    } else {
      waveOverlay = <div className="wave-overlay" onClick={this.playPauseTrack}></div>
    }

    return  <div className="home-body">
              <div className="margin-div"></div>
              <div className="track-details-div">
                <div className="track-details-banner" style={bannerBackground}>
                  <div className="details-left">
                    <div className="details-top-left">
                      <div className="details-play-pause" onClick={this.playPauseTrack}>
                        {playPauseIcon}
                      </div>
                      <div className="details-text">
                        <span className="details-artist-name"><Link className="track-details-link" to={`/profile/${track.artistId}`}>{track.artistName}</Link></span>
                        {titleWrapper}
                      </div>
                    </div>
                    <div className={this.state.waveClass}>
                      <div className="wavesurfer" onClick={this.seek}>
                        <Wavesurfer
                          ref={(ws) => this.wavesurfer = ws}
                          audioFile={track.musicUrl}
                          options={waveOptions}
                          pos={this.state.currentTime}
                          onLoading={() => this.setState({waveClass: "details-bottom-left-hidden"})}
                          onReady={() => this.setState({waveClass: "details-bottom-left"})}
                          onFinish={() => this.setState({currentTime: 0.1})}
                        />
                      </div>
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
