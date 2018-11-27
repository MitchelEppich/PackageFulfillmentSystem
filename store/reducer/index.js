/*******************************************/
/*main reducer with miscellaneous state
 management.
 This reducer imports all other reducers and
  combines them to be exported to the store*/
/******************************************/

import actionTypes from "../actions";
import { combineReducers } from "redux";
import { updateObject } from "../utility";

const initialState = {
  showScreen: false,
  showMoreMultipleFields: false,
  companies: [    
    {
      nick: "cks",
      name: "Crop King Seeds",
      number: "704",
      orders: "64"
    },
    {
      nick: "snm",
      name: "Sonoma Seeds",
      number: "304",
      orders: "39"
    },
    {
      nick: "sw",
      name: "SunWest Genetics",
      number: "104",
      orders: "32"
    },
    {
      nick: "bv",
      name: "Beaver Seeds",
      number: "504",
      orders: "5"
    },
     {
      nick: "mjg",
      name: "Crop King Seeds",
      number: "604",
      orders: "11"
    },
     {
      nick: "mjsc",
      name: "Crop King Seeds",
      number: "904",
      orders: "14"
    },
     {
      nick: "stf",
      name: "Crop King Seeds",
      number: "204",
      orders: "34"
    },
     {
      nick: "other",
      name: "Crop King Seeds",
      number: "404",
      orders: "34"
    },
    ]
}

const indexReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_SCREEN:    
      return updateObject(state, {
        showScreen: !state.showScreen
      });
    case actionTypes.TOGGLE_SHOW_MORE:    
      return updateObject(state, {
        showMoreMultipleFields: !state.showMoreMultipleFields
      });
   
    default:
      return state;
  }
};

export default indexReducer
// export default combineReducers({
// });
