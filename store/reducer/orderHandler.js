import actionTypes from "../actions";
import { updateObject } from "../utility";

const initialState = {
  cachedOrders: [],
  claimedOrders: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MODIFY_CLAIMS:
      return updateObject(state, { claimedOrders: action.input });
    default:
      return state;
  }
};
