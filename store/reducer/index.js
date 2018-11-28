/*******************************************/
/*main reducer with miscellaneous state
 management.
 This reducer imports all other reducers and
  combines them to be exported to the store*/
/******************************************/

import actionTypes from "../actions";
import { combineReducers } from "redux";
import { updateObject } from "../utility";

import userReducer from "./user";
import navReducer from "./navigation";
import itemReducer from "./itemHandler";

const initialState = {
  showScreen: false,
  showLoginScreen: true,
  showRegisterScreen: false,
  showLogScreen: false,
  companies: [
    // {
    //   short: "",
    //   name: "",
    //   number: 0,
    //   orders: []
    // },
    {
      short: "mjsc.com",
      name: "Mary Jane Seeds COM",
      id: 1,
      orders: []
    },
    {
      short: "mjsc.ca",
      name: "Mary Jane Seeds CA",
      id: 3,
      orders: []
    },
    {
      short: "mjg",
      name: "Mary Janes Garden",
      id: 4,
      orders: []
    },
    {
      short: "swg",
      name: "Sunwest Genetics",
      id: 5,
      orders: []
    },
    {
      short: "cks",
      name: "Crop King Seeds",
      id: 6,
      orders: []
    },
    {
      short: "bs",
      name: "Beaver Seeds",
      id: 7,
      orders: []
    },
    {
      short: "sns",
      name: "Sonoma Seeds",
      id: 8,
      orders: []
    },
    {
      short: "sfs",
      name: "Star Flower Seeds",
      id: 9,
      orders: []
    },
    {
      short: "wholesale",
      name: "wholesale",
      id: 0,
      orders: []
    }
  ]
};

const indexReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_SCREEN:
      return updateObject(state, {
        showScreen: !state.showScreen
      });
    case actionTypes.TOGGLE_LOGIN_SCREEN:
      return updateObject(state, {
        showLoginScreen: !state.showLoginScreen
      });
    case actionTypes.TOGGLE_SHOW_REGISTER_SCREEN:
      return updateObject(state, {
        showRegisterScreen: !state.showRegisterScreen
      });
    case actionTypes.TOGGLE_SHOW_LOG:
      return updateObject(state, {
        showLogScreen: !state.showLogScreen
      });

    default:
      return state;
  }
};

// export default indexReducer;
export default combineReducers({
  misc: indexReducer,
  user: userReducer,
  nav: navReducer,
  item: itemReducer
});
