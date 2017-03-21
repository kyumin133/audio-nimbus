import TrackAPIUtil from '../util/track_api_util';
import { hashHistory } from 'react-router';

export const RECEIVE_PLAY_PAUSE_TRACK_FROM_AUDIO = "RECEIVE_PLAY_PAUSE_TRACK_FROM_AUDIO";
export const RECEIVE_PLAY_PAUSE_TRACK = "RECEIVE_PLAY_PAUSE_TRACK";
export const STOP_CURRENT_TRACK = "STOP_CURRENT_TRACK";
export const RECEIVE_TRACKS = "RECEIVE_TRACKS";
export const RECEIVE_TRACK = "RECEIVE_TRACK";
export const REMOVE_TRACK = "REMOVE_TRACK";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const RECEIVE_UPLOAD_STATUS = "RECEIVE_UPLOAD_STATUS";

export const receivePlayPauseTrackFromAudio = (paused) => {
  return {
    type: RECEIVE_PLAY_PAUSE_TRACK_FROM_AUDIO,
    paused
  }
}

export const receivePlayPauseTrack = (track) => {
  return {
    type: RECEIVE_PLAY_PAUSE_TRACK,
    track
  };
};

export const stopCurrentTrack = () => {
  return {
    type: STOP_CURRENT_TRACK,
  };
}

export const receiveTracks = (tracks) => {
  return {
    type: RECEIVE_TRACKS,
    tracks
  };
};

export const receiveTrack = (track) => ({
  type: RECEIVE_TRACK,
  track
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
});

export const receiveUploadStatus = (uploading) => ({
  type: RECEIVE_UPLOAD_STATUS,
  uploading
});

export const fetchTracks = (user) => (dispatch) => {
  return TrackAPIUtil.fetchTracks(user).then(response => {
    return dispatch(receiveTracks(response));
  }).fail(errors => {
    return dispatch(receiveErrors(JSON.parse(errors.responseText)));
  });
};

export const fetchTrack = (track) => (dispatch) => {
  return TrackAPIUtil.fetchTrack(track).then(response => {
    return dispatch(receiveTrack(response));
  }).fail(errors => {
    return dispatch(receiveErrors(JSON.parse(errors.responseText)));
  });
};

export const playPauseTrack = (track) => (dispatch) => {
  return dispatch(receivePlayPauseTrack(track));
}

export const playPauseTrackFromAudio = (paused) => (dispatch) => {
  return dispatch(receivePlayPauseTrackFromAudio(paused));
}

export const createTrack = (track) => (dispatch) => {
  dispatch(receiveUploadStatus(true));
  return TrackAPIUtil.createTrack(track).then(response => {
    dispatch(receiveTrack(response));
    dispatch(receiveUploadStatus(false));

  }).then(() => {
    hashHistory.push("/home");
  }).fail(errors => {
    return dispatch(receiveErrors(JSON.parse(errors.responseText)));
  });
}

export const updateTrack = (id, track) => (dispatch) => {
  return TrackAPIUtil.updateTrack(id, track).then(response => {
    dispatch(receiveTrack(response));
  }).fail(errors => {
    return dispatch(receiveErrors(JSON.parse(errors.responseText)));
  });
}
