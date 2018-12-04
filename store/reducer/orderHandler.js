import actionTypes from "../actions";
import { updateObject } from "../utility";

const initialState = {
  cachedOrders: [],
  claimedOrders: [],
  orderCache: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MODIFY_CLAIMS:
      return updateObject(state, { claimedOrders: action.input });
    case actionTypes.FETCH_ORDER_LIST:
      return updateObject(state, { orderCache: action.input });
    case actionTypes.UPDATE_CACHE:
      return updateObject(state, { orderCache: action.input });
    default:
      return state;
  }
};
