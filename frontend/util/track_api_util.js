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
  },

  createTrack: (track) => {
    // console.log(track);
    return $.ajax({
      url: "api/tracks",
      type: "POST",
      data: track,
      processData: false,
      contentType: false,
      dataType: 'json',
      error: (error) => {
        console.log(error.responseText);
      }
    });
  }
};

export default TrackAPIUtil;
