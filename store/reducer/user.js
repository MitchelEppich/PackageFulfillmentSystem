import actionTypes from "../actions";
import { updateObject } from "../utility";

const initialState = {
  currentUser: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.VERIFY_CREDENTIALS:
      return updateObject(state, { currentUser: action.user });
    case actionTypes.FETCH_CREDENTIALS:
      return updateObject(state, { currentUser: action.user });
    case actionTypes.RELEASE_CREDENTIALS:
      return updateObject(state, { currentUser: null });
    default:
      return state;
  }
};
