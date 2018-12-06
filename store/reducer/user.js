import actionTypes from "../actions";
import { updateObject } from "../utility";

const initialState = {
  currentUser: null,
  registerUser: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.VERIFY_CREDENTIALS:
      return updateObject(state, { currentUser: action.user });
    case actionTypes.FETCH_CREDENTIALS:
      return updateObject(state, { currentUser: action.user });
    case actionTypes.UPDATE_USER:
      return updateObject(state, {
        currentUser: action.user == null ? state.currentUser : action.user
      });
    case actionTypes.RELEASE_CREDENTIALS:
      return updateObject(state, { currentUser: null });
    case actionTypes.REGISTER_CREDENTIALS:
      return updateObject(state, { registerUser: action.user });
    case actionTypes.CLEAR_REGISTERED_USER:
      return updateObject(state, { registerUser: null });
    default:
      return state;
  }
};
