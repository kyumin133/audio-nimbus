# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

## JSON API

### Users

- `POST /api/users`
- `PATCH /api/users`

### Session

- `POST /api/session`
- `DELETE /api/session`

### Tracks

- `GET /api/tracks`
  - Tracks index
  - accepts `artist_id` query param to list tracks by artist
  - accepts pagination params (if I get there)
- `POST /api/tracks`
- `GET /api/tracks/:id`
- `PATCH /api/tracks/:id`
- `DELETE /api/tracks/:id`

### Comments
- `GET /api/tracks/:track_id/comments`
  - Comments index
  - Lists comments by track
- `POST /api/comments`
