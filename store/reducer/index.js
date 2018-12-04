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
import orderReducer from "./orderHandler";

const initialState = {
  visibleScreen: ["login"], // When null show main screen
  geneColors: ["purple", "red", "yellow", "white", "blue", "green"],
  companies: [
    // {
    //   short: "",
    //   name: "",
    //   number: 0,
    //   orders: []
    // },
    {
      short: "mjsc",
      name: "Mary Jane Seeds COM",
      id: 1,
      orders: [],
      url: "https://www.cksoti.com/getalldispatchorderdetail/mjseedscanada.com"
    },
    {
      short: "mjscc",
      name: "Mary Jane Seeds CA",
      id: 3,
      orders: [],
      url: "https://www.cksoti.com/getalldispatchorderdetail/mjseedscanada.ca"
    },
    {
      short: "mjg",
      name: "Mary Janes Garden",
      id: 4,
      orders: [],
      url:
        "https://www.cksoti.com/getalldispatchorderdetail/maryjanesgarden.com"
    },
    {
      short: "swg",
      name: "Sunwest Genetics",
      id: 5,
      orders: [],
      url:
        "https://www.cksoti.com/getalldispatchorderdetail/sunwestgenetics.com"
    },
    {
      short: "cks",
      name: "Crop King Seeds",
      id: 6,
      orders: [],
      url: "https://www.cksoti.com/getalldispatchorderdetail/cropkingseeds.com"
    },
    {
      short: "bs",
      name: "Beaver Seeds",
      id: 7,
      orders: [],
      url: "https://www.cksoti.com/getalldispatchorderdetail/beaverseeds.ca"
    },
    {
      short: "snm",
      name: "Sonoma Seeds",
      id: 8,
      orders: [],
      url: "https://www.cksoti.com/getalldispatchorderdetail/sonomaseeds.com"
    },
    // {
    //   short: "sfs",
    //   name: "Star Flower Seeds",
    //   id: 9,
    //   orders: [],
    //   url:
    //     "https://www.cksoti.com/getalldispatchorderdetail/starflowerseeds.com"
    // },
    {
      short: "wholesale",
      name: "wholesale",
      id: 0,
      orders: [],
      url: "http://invoice.zoho.com/api/v3/invoices",
      headers: {
        "Postman-Token": "1f99d336-97d3-49c0-aef9-c529ba54c8ce",
        "cache-control": "no-cache",
        Authorization: "f86f4906a3b740667322433cfb9e431d",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "X-com-zoho-invoice-organizationid": "59999705"
      }
    }
  ]
};

const indexReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_VISIBLE_SCREEN:
      return updateObject(state, {
        visibleScreen: action.input
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
  item: itemReducer,
  order: orderReducer
});
