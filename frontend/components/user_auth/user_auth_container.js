import { connect } from "react-redux";
import { login, signup } from "../../actions/session_actions";
import SessionForm from "./session_form";
const mapStateToProps = (state, ownProps) => {
  return {
      loggedIn: (state.session.currentUser !== null),
      errors: state.session.errors,
      formType: ownProps.formType
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    processForm: (user, formType) => {
      if (formType === "login") {
        return dispatch(login(user));
      } else {
        return dispatch(signup(user));
      }
    },    
    setForm: (form, email) => ownProps.setForm(form, email)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
