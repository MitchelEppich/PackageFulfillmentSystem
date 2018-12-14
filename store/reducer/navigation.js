import actionTypes from "../actions";
import { updateObject } from "../utility";

const initialState = {
  focusCompany: null,
  focusOrder: null,
  promptLogs: null,
  promptUsers: null,
  orderFilter: ["usa", "canada", "world"],
  orderFilterKeys: ["usa", "canada", "world"]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_ORDER:
      return updateObject(state, {});
    case actionTypes.SET_ORDER_FILTER:
      return updateObject(state, { orderFilter: action.input });
    case actionTypes.FOCUS_COMPANY:
      return updateObject(state, { focusCompany: action.input });
    case actionTypes.FETCH_ORDER:
      return updateObject(state, { focusOrder: action.order });
    case actionTypes.MODIFY_FOCUS_ORDER:
      return updateObject(state, { focusOrder: action.input });
    case actionTypes.FETCH_LOGS:
      return updateObject(state, { promptLogs: action.logs });
    case actionTypes.MODIFY_LOGS:
      return updateObject(state, { promptLogs: action.input });
    case actionTypes.FETCH_USERS:
      return updateObject(state, { promptUsers: action.users });
    case actionTypes.MODIFY_USER:
      return updateObject(state, { promptUsers: action.input });
    case actionTypes.DELETE_USER:
      return updateObject(state, { promptUsers: action.input });
    default:
      return state;
  }
};
