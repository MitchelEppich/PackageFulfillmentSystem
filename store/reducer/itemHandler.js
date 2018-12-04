import actionTypes from "../actions";
import { updateObject } from "../utility";

const initialState = {
  itemBaseList: [],
  itemValues: [],
  expandItems: [],
  missedItems: []
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
        expandItems: [],
        missedItems: []
      });
    case actionTypes.REMOVE_ITEM_MISSED:
      console.log(action);
      let _new = state.missedItems.filter(key => {
        if (key == action.item) return false;
        return true;
      });
      return updateObject(state, {
        missedItems: _new
      });
    case actionTypes.EXPAND_ITEM:
      return updateObject(state, {
        expandItems: action.input
      });
    case actionTypes.VERIFY_ITEM_LIST:
      return updateObject(state, {
        missedItems: action.input
      });
    default:
      return state;
  }
};
