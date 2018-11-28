import actionTypes from "../actions";
import { updateObject } from "../utility";

const initialState = {
  itemBaseList: [],
  itemValues: [],
  expandItems: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MULTI_ITEM_BASE:
      return updateObject(state, {
        itemBaseList: action.itemBaseList,
        itemValues: action.itemValues
      });
    case actionTypes.SET_ITEM_VALUE:
      return updateObject(state, {
        itemValues: action.itemValues
      });
    case actionTypes.CLEAR_ITEM:
      return updateObject(state, {
        itemValues: [],
        itemBaseList: [],
        expandItems: []
      });
    case actionTypes.EXPAND_ITEM:
      return updateObject(state, {
        expandItems: action.input
      });
    default:
      return state;
  }
};
