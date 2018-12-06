import actionTypes from "../actions";
import { updateObject } from "../utility";

const initialState = {
  cachedOrders: [],
  orderCache: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MODIFY_ORDER:
      return updateObject(state, {});
    case actionTypes.FETCH_ORDER_LIST:
      return updateObject(state, { orderCache: action.input });
    case actionTypes.UPDATE_CACHE:
      return updateObject(state, { orderCache: action.input });
    case actionTypes.UPDATE_ORDER:
      return updateObject(state, {});
    case actionTypes.CACHE_ORDER:
      return updateObject(state, {});
    default:
      return state;
  }
};
