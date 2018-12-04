import actionTypes from "../actions";
import { updateObject } from "../utility";

const initialState = {
  currentUser: null,
  registerUser: null,
  registeredUsers: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.VERIFY_CREDENTIALS:
      return updateObject(state, { currentUser: action.user });
    case actionTypes.FETCH_CREDENTIALS:
      return updateObject(state, { currentUser: action.user });
    case actionTypes.FETCH_USERS:
      return updateObject(state, { registeredUsers: action.users });
    case actionTypes.RELEASE_CREDENTIALS:
      return updateObject(state, { currentUser: null });
    case actionTypes.REGISTER_CREDENTIALS:
      return updateObject(state, { registerUser: action.user });
    default:
      return state;
  }
};
