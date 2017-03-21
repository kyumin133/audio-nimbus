# AudioNimbus

[Heroku link][heroku]

[Trello link][trello]

[heroku]: https://sound-hound.herokuapp.com/
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
- [ ] Likes
