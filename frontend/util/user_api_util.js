import { receiveCurrentUser } from "../actions/session_actions";

const UserAPIUtil = {
  fetchUser: (userId) => {
    return $.ajax({
      url: `api/users/${userId}`,
      type: "GET"
    })
  },

  updateUser: (userId, formData) => {
    return $.ajax({
      url: `/api/users/${userId}`,
      type: 'PATCH',
      processData: false,
      contentType: false,
      dataType: 'json',
      data: formData,
      success: (user) => {
        receiveCurrentUser(user);
      }
    });
  }
}

export default UserAPIUtil;
