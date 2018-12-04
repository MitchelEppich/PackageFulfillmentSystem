import actionTypes from "../actions";
import { updateObject } from "../utility";

const initialState = {
  focusCompany: null,
  focusOrder: null,
  promptLogs: null,
  promptUsers: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FOCUS_COMPANY:
      return updateObject(state, { focusCompany: action.input });
    case actionTypes.FETCH_ORDER:
      return updateObject(state, { focusOrder: action.order });
    case actionTypes.FETCH_LOGS:
      return updateObject(state, { promptLogs: action.logs });
    case actionTypes.MODIFY_LOGS:
      return updateObject(state, { promptLogs: action.input });
    case actionTypes.FETCH_USERS:
      return updateObject(state, { promptUsers: action.users });
    case actionTypes.MODIFY_USER:
      return updateObject(state, { promptUsers: action.input });
    default:
      return state;
  }
};
