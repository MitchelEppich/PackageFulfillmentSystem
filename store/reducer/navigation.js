import actionTypes from "../actions";
import { updateObject } from "../utility";

const initialState = {
  focusCompany: null,
  focusOrder: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FOCUS_COMPANY:
      return updateObject(state, { focusCompany: action.input });
    case actionTypes.FETCH_ORDER:
      return updateObject(state, { focusOrder: action.order });
    default:
      return state;
  }
};
