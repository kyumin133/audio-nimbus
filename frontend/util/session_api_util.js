const SessionAPIUtil = {
  checkEmail: (email) => {
    email = email.toLowerCase();
    return $.ajax({
      url: "api/session/email",
      type: "GET",
      data: { email: email }
    });
  },
  signup: (user) => {
    return $.ajax({
      url: "api/users",
      type: "POST",
      data: { user: user }
    });
  },

  login: (user) => {
    return $.ajax({
      url: "api/session",
      type: "POST",
      data: { user: user }
    });
  },

  logout: () => {    
    return $.ajax({
      url: "api/session",
      type: "DELETE"
    })
  }
}

export default SessionAPIUtil;
