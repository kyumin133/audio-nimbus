import TrackAPIUtil from '../util/track_api_util';
import { hashHistory } from 'react-router';

export const RECEIVE_PLAY_PAUSE_TRACK_FROM_AUDIO = "RECEIVE_PLAY_PAUSE_TRACK_FROM_AUDIO";
export const RECEIVE_PLAY_PAUSE_TRACK = "RECEIVE_PLAY_PAUSE_TRACK";
export const STOP_CURRENT_TRACK = "STOP_CURRENT_TRACK";
export const RECEIVE_TRACKS = "RECEIVE_TRACKS";
export const RECEIVE_ALL_TRACKS = "RECEIVE_ALL_TRACKS";
export const RECEIVE_TRACK = "RECEIVE_TRACK";
export const REMOVE_TRACK = "REMOVE_TRACK";
export const RECEIVE_TRACK_ERRORS = "RECEIVE_TRACK_ERRORS";
export const RECEIVE_UPLOAD_STATUS = "RECEIVE_UPLOAD_STATUS";
export const RECEIVE_CURRENT_TIME = "RECEIVE_CURRENT_TIME";
export const RECEIVE_CURRENT_TIME_BY_POS = "RECEIVE_CURRENT_TIME_BY_POS";

export const receiveCurrentTimeByPos = (currentPos) => {
  return {
    type: RECEIVE_CURRENT_TIME_BY_POS,
    currentPos
  }
}
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

export const receiveAllTracks = (tracks) => {
  return {
    type: RECEIVE_ALL_TRACKS,
    tracks
  }
}

export const receiveTrack = (track) => ({
  type: RECEIVE_TRACK,
  track
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_TRACK_ERRORS,
  errors
});

export const receiveUploadStatus = (uploading) => ({
  type: RECEIVE_UPLOAD_STATUS,
  uploading
});

export const receiveCurrentTime = (currentTime) => ({
  type: RECEIVE_CURRENT_TIME,
  currentTime
})

export const fetchTracks = (userId) => (dispatch) => {
  return TrackAPIUtil.fetchTracks(userId).then(response => {
    if (userId === -1) {
      dispatch(receiveAllTracks(response));
    }
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
    dispatch(receiveUploadStatus(false));
    return dispatch(receiveTrack(response));

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
