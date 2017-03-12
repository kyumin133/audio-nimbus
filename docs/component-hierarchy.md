## Component Hierarchy

**AuthContainer**
 - EmailEntry
  * Login
  * Signup

**HomeContainer**
 - HomeHeaderContainer
 - HomeBody
  * HomeAnimation

**HomeHeaderContainer**
 - NavHeader

**TracksIndex**
 - TracksIndexItem

**PlayAudio**
 - PlaybackControls
 - PlaybackBar
  * ProgressBar
 - PlaybackSongInfo

**Profile**
 - UserDetails
 - TracksIndex

**SongDetails**
 - SongDetailsBanner
 - CommentsForm
 - CommentsIndex
  * CommentsIndexItem

**UploadSong**
 - UploadSongForm

## Routes

|Path   | Component   |
|-------|-------------|
| "/login" | "Login" |
| "/signup" | "Signup" |
| "/home" | "HomeContainer" |
| "/tracks" | "TracksIndex" |
| "/tracks/:trackId" | "SongDetails" |
| "/users/:userId | "Profile" |
| "/tracks/new" | "UploadSong" |
