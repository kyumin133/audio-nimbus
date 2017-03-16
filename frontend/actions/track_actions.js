import TrackAPIUtil from '../util/track_api_util';

export const RECEIVE_PLAY_TRACK = "RECEIVE_PLAY_TRACK";
export const STOP_CURRENT_TRACK = "STOP_CURRENT_TRACK";
export const RECEIVE_TRACKS = "RECEIVE_TRACKS";
export const RECEIVE_TRACK = "RECEIVE_TRACK";
export const REMOVE_TRACK = "REMOVE_TRACK";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";

export const receivePlayTrack = (track) => {
  return {
    type: RECEIVE_PLAY_TRACK,
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
})

export const fetchTracks = (user) => (dispatch) => {
  return TrackAPIUtil.fetchTracks(user).then(response => {
    return dispatch(receiveTracks(response));
  }).fail(errors => {
    return dispatch(receiveErrors(JSON.parse(errors.responseText)));
  });
};

export const fetchTrack = (track) => (dispatch) => {
  return TrackAPIUtil.fetchTracks(track).then(response => {
    return dispatch(receiveTrack(response));
  }).fail(errors => {
    return dispatch(receiveErrors(JSON.parse(errors.responseText)));
  });
};

export const playTrack = (track) => (dispatch) => {
  return dispatch(receivePlayTrack(track));
}
