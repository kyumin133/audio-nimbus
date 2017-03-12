```js
{
  currentUser: {
    id: 1,
    username: "ken",
    email: "ken@appacademy.io"
  }
  tracks: {
    1: {
      id: 1,
      artistId: 1,
      artistUsername: "ken",
      title: "Ken's song",
      imageUrl: "ken_song.png"
    },
    2: {
      id: 2,
      artistId: 2,
      artistUsername: "chase"
      title: "Chase's song",
      imageUrl: "chase_song.png"
    },  
  },
  track: {
    id: 1,
    artistId: 1,
    artistUsername: "ken",
    title: "Ken's song",
    imageUrl: "ken_song.png",
    comments: {
      1: {
        id: 1,
        authorId: 2,
        authorImg: "chase.png",
        authorUsername: "chase",
        text: "Nice!",
        postTime: "2017/03/11 20:35:00"
      },
      3: {
        id: 3,
        authorId: 1,
        authorImg: "ken.png",
        authorUsername: "ken",
        text: "Thanks!",
        postTime: "2017/03/11 22:25:00"
      },
    }
  }
  user: {
    id: 2,
    username: "chase",
    userImg: "chase.png"
  }

}
