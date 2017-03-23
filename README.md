# AudioNimbus
[Live link][heroku]

[heroku]: http://audionimb.us/

AudioNimbus is a music uploading web application inspired by SoundCloud.

## Technical Framework
The
application uses a PostgreSQL database, Ruby on Rails back-end, AWS cloud hosting,
and a React.js frontend with a Redux architectural framework.

## Features & Implementation
### Content Management
#### Rails
User profile pictures, track album art, and track audio mp3 files are all stored using AWS S3. I used the Paperclip gem to interface between Rails and AWS.

Tracks migration:
```ruby
add_attachment :tracks, :image
add_attachment :tracks, :music
```

Model:
```ruby
has_attached_file :image, default_url: "assets/track.jpeg"
has_attached_file :music
validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
validates_attachment_content_type :music, content_type: [ 'audio/mpeg3', 'application/mp3', 'audio/mp3', 'audio/mpeg']
```

In the controller, ```:image``` and ```:music``` are handled like any other column.

#### React/Redux

Users upload files via ```<input type="file">``` elements in the front-end.


```javascript
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
```

When submitted, the file data gets saved to a ```FormData``` instance and sent to the Rails server via an AJAX request.

```javascript
// upload_form.jsx
handleSubmit(e) {
  e.preventDefault();

  let formData = new FormData();
  [...]
  formData.append("track[music]", this.state.musicFile)
  this.props.createTrack(formData);
}

// track_api_util.js
createTrack: (formData) => {
  return $.ajax({
    url: "api/tracks",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    dataType: 'json'
  });
}
```


### Track Playback
### Colors
SoundCloud changes the background color of profile pages based on the color
of the profile picture.

## Future Work
### Waveforms
SoundCloud displays waveforms for the song, which would be a nice visual touch.
### Playlists
Currently, the app simply plays the next track listed on the main page. It would
be nice if users could create playlists and play only the tracks there.
### Likes
Allow users to like tracks.


<!-- [Heroku link][heroku]

[Trello link][trello]


[trello]: https://trello.com/b/auMfS3OH/soundhound

## Minimum Viable Product

AudioNimbus is a web application inspired by SoundCloud built using Ruby on Rails
and React/Redux.  By the end of Week 9, this app will, at a minimum, satisfy the
following criteria with smooth, bug-free navigation, adequate seed data and
sufficient CSS styling:

- [ ] Hosting on Heroku
- [ ] New account creation, login, and guest/demo login
- [ ] Song CRUD
- [ ] Playing songs with progress bar with continuous play
- [ ] Comments
- [ ] User pages
- [ ] Production README

## Design Docs
* [View Wireframes][wireframes]
* [React Components][components]
* [API endpoints][api-endpoints]
* [DB schema][schema]
* [Sample State][sample-state]

[wireframes]: docs/wireframes
[components]: docs/component-hierarchy.md
[sample-state]: docs/sample-state.md
[api-endpoints]: docs/api-endpoints.md
[schema]: docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and Front End User Authentication (1.5 days)

**Objective:** Functioning rails project with front-end authentication, including a demo login.

### Phase 2: Tracks model, API, and components (2 days)

**Objective:** Allow song CRUD, displaying information about the song as well.

### Phase 3: Cloud setup (1 day)
**Objective:** Set up cloud to host images and audio.

### Phase 4: Track playback (1.5 days)

**Objective:** Tracks play continuously across pages.

### Phase 5: User profile information (1.5 days)

**Objective:** User pages that contain username, email, profile picture, and tracks.

### Phase 6: Comments model, API, and components (1.5 days)

**Objective:** Allow users to comment on tracks.

### Bonus Features (TBD)
- [ ] Wave Forms
- [ ] Playlists
- [ ] Likes -->
