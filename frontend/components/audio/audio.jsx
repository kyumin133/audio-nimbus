import React from "react";
// import ReactDOM from 'react-dom';
import ReactAudioPlayer from 'react-audio-player';
import { Link } from "react-router";
import { Line } from 'rc-progress';
import Slider from 'rc-slider';
import Wavesurfer from 'react-wavesurfer';

class Audio extends React.Component {
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (!this.props.track || !nextProps.track) {
  //     return true;
  //   }
  //   console.log(this.props.track)
  //   console.log(nextProps.track);
  //   return (this.props.track.id !== nextProps.track.id);
  // }
  constructor(props) {
    super(props);
    this.back = this.back.bind(this);
    this.next = this.next.bind(this);
    this.loadSong = this.loadSong.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.displayTime = this.displayTime.bind(this);
    this.twoDigitNum = this.twoDigitNum.bind(this);
    this.toggleVolume = this.toggleVolume.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.jumpProgress = this.jumpProgress.bind(this);
    this.start = this.start.bind(this);
    this.state = {
      paused: false,
      percent: 0,
      volume: 50,
      previousVolume: 50
    }

  }

  back() {
    if (this.rap.audioEl.currentTime > 1) {
      this.rap.audioEl.currentTime = 0;
    } else {
      let tracks = this.props.tracks;
      this.loadSong(tracks[(tracks.length + this.props.trackIndex - 1) % tracks.length]);
    }
  }

  next() {
    let tracks = this.props.tracks;
    this.loadSong(tracks[(tracks.length + this.props.trackIndex + 1) % tracks.length]);
  }

  loadSong(track) {
    this.props.playPauseTrack(track);
  }

  jumpProgress(e) {
    this.rap.audioEl.currentTime = this.rap.audioEl.duration * ( e.nativeEvent.offsetX / e.currentTarget.clientWidth )
    this.setState({
      currentTime: this.displayTime(this.rap.audioEl.currentTime),
      percent: 100 * this.rap.audioEl.currentTime / this.rap.audioEl.duration
    });
  }

  handleVolumeChange(e) {
    this.rap.audioEl.volume = 0.01 * e;
    this.setState({volume: e})
  }

  toggleVolume() {
    if (this.rap.audioEl.volume > 0) {
      this.rap.audioEl.volume = 0;
      this.setState({
        volume: 0,
        previousVolume: this.state.volume
      });
    } else {
      this.rap.audioEl.volume = 0.01 * this.state.previousVolume;
      this.setState({
        volume: this.state.previousVolume,
        previousVolume: this.state.previousVolume
      })
    }
  }

  togglePlay() {
    // (this.rap.audioEl.paused) ? this.rap.audioEl.play() : this.rap.audioEl.pause();
    this.props.playPauseTrackFromAudio(this.rap.audioEl.paused);
    // this.setState({paused: !this.state.paused});
  }

  updateTime() {
    if (!this.rap) {
      clearInterval(this.interval);
      return;
    }
    if (this.rap.audioEl.currentTime === this.rap.audioEl.duration) {
      this.next();
    } else {
      // this.wavesurfer.pos = this.rap.audioEl.currentTime;
      this.setState({
        currentTime: this.displayTime(this.rap.audioEl.currentTime),
        percent: 100 * this.rap.audioEl.currentTime / this.rap.audioEl.duration
      });
    }
  }


  start() {
    // var reader = new FileReader();
    //
    // reader.onloadend = function() {
    //   // let str = reader.result;
    //   // let buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
    //   // let bufView = new Uint16Array(buf);
    //   // for (let i=0, strLen=str.length; i<strLen; i++) {
    //   //   bufView[i] = str.charCodeAt(i);
    //   // }
    //   // let buf = this.str2ab(reader.result);
    //
    //   let context = new (window.AudioContext || window.webkitAudioContext)();
    //   console.log(reader.result);
    //   context.decodeAudioData(reader.result, (buffer) => {
    //     this.buffer = buffer;
    //     console.log("loaded!!");
    //   });
    // }.bind(this);
    //
    // reader.readAsArrayBuffer(new File([this.props.track.musicUrl], "currentTrack"));

    this.rap.audioEl.play();
    this.rap.audioEl.volume = 0.5
    this.setState({
      paused: false,
      currentTime: this.displayTime(this.rap.audioEl.currentTime),
      duration: this.displayTime(this.rap.audioEl.duration),
      percent: 0
    });
    this.interval = setInterval(() => {
      this.updateTime();
    }, 100);
  }

  displayTime(seconds) {
    let seconds_rounded = Math.round(seconds);
    let hours = Math.floor(seconds_rounded / 3600);

    seconds_rounded -= (hours * 3600);
    let minutes = Math.floor(seconds_rounded / 60);

    seconds_rounded -= (minutes * 60);

    if (hours > 0) {
      return `${hours.toString()}:${this.twoDigitNum(minutes)}:${this.twoDigitNum(seconds_rounded)}`;
    } else {
      return `${minutes.toString()}:${this.twoDigitNum(seconds_rounded)}`;
    }
  }

  twoDigitNum(num) {
    if (num <= 0) {
      return "00";
    } else if (num < 10) {
      return `0${num.toString()}`;
    } else {
      return num.toString();
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.rap === undefined) {
      return;
    }
    // console.log(newProps);
    if (newProps.paused !== this.props.paused) {
      (this.rap.audioEl.paused) ? this.rap.audioEl.play() : this.rap.audioEl.pause();
      this.setState({paused: !this.state.paused});
    }

    if (newProps.artistName !== this.props.artistName) {
      this.forceUpdate();
    }
  }

  render() {
    // console.log(this.state.paused);
    let waveOptions = {
      fillParent: true,
      height: 140,
      progressColor: '#6c718c',
      waveColor: '#c4c8dc',
      normalize: true,
      barWidth: 3,
      audioRate: 1
    };
    let track = this.props.track;
    if (!track) {
      return null;
    }

    let playPauseIcon = <i className="fa fa-pause play-pause" aria-hidden="true"></i>;
    if (this.state.paused) {
      playPauseIcon = <i className="fa fa-play play-pause" aria-hidden="true"></i>
    }

    let volumeIcon = <i className="fa fa-volume-down" aria-hidden="true"></i>;
    if (this.state.volume <= 0) {
      volumeIcon = <i className="fa fa-volume-off" aria-hidden="true"></i>;
    } else if (this.state.volume >= 100) {
      volumeIcon = <i className="fa fa-volume-up" aria-hidden="true"></i>;
    }


    let pos = 0;
    if (!!this.rap) {
      pos = this.rap.audioEl.currentTime;
    }

    return  <div className="audio">
              <div className="wavesurfer">
                <Wavesurfer
                  ref={(ws) => this.wavesurfer = ws}
                  audioFile={track.musicUrl}
                  options={waveOptions}
                  pos={pos}
                />
              </div>
              <div className="controls-div">
                <ul className="controls-ul">
                  <li onClick={this.back}><i className="fa fa-step-backward" aria-hidden="true"></i></li>
                  <li onClick={this.togglePlay}>{playPauseIcon}</li>
                  <li onClick={this.next}><i className="fa fa-step-forward" aria-hidden="true"></i></li>
                </ul>
              </div>
              <div className="audio-player">
                <span className="time">{this.state.currentTime}</span>
                <div className="progress-bar" onClick={this.jumpProgress}>
                  <Line percent={this.state.percent} strokeColor={"#f50"} strokeWidth={1} trailColor={"rgb(150, 150, 150)"}></Line>
                </div>
                <span className="time">{this.state.duration}</span>
                <div className="volume">
                  <div className="volume-slider">
                    <Slider defaultValue={50} vertical value={this.state.volume} onChange={this.handleVolumeChange}></Slider>
                  </div>
                  <div className="volume-button" onClick={this.toggleVolume}>
                    {volumeIcon}
                  </div>
                </div>
              </div>
              <ReactAudioPlayer ref={c => this.rap = c } onCanPlay={this.start} className="hidden" id="audio" src={track.musicUrl} controls={false} preload="auto" autoplay={true}/>
              <div className="audio-details-div">
                <Link className="track-details-link" to={`/track/${track.id}`}><img src={track.imageUrl} className="audio-img"></img></Link>
                <div className="audio-text-details">
                  <Link className="track-details-link" to={`/profile/${track.artistId}`}><span className="track-info-artist">{track.artistName}</span></Link>
                  <Link className="track-details-link" to={`/track/${track.id}`}><span className="track-info-title">{track.title}</span></Link>
                </div>
              </div>
            </div>
  }
}

export default Audio;
