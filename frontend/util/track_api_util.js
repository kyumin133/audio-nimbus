const TrackAPIUtil = {
  fetchTracks: (user = {}) => {
    return $.ajax({
      url: "api/tracks",
      type: "GET",
      data: { user }
    });
  },

  fetchTrack: (trackId) => {
    return $.ajax({
      url: `api/tracks/${trackId}`,
      type: "GET",
    });
  }
};

export default TrackAPIUtil;
