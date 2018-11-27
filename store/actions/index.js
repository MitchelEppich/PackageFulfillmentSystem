/*******************************************/
/*Index Actions for all miscellaneous related
dispatch actions. All other actiontypes are
imported into this file, to then be exported
for the reducers and corresponding pages.*/
/******************************************/

import gql from "graphql-tag";
import { makePromise, execute } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";

const uri = "http://localhost:3000/graphql";

const imports = {};

const actionTypes = {
  TOGGLE_SCREEN: "TOGGLE_SCREEN",
  TOGGLE_SHOW_MORE: "TOGGLE_SHOW_MORE",
};

const actions = {
  toggleScreen: () => {    
    return {
      type: actionTypes.TOGGLE_SCREEN,      
    }  
  },
  toggleShowMoreMultipleFields: () => {    
    return {
      type: actionTypes.TOGGLE_SHOW_MORE,      
    }  
  },
};

const query = {};

const mutation = {};

export default {
  // TYPES
  ...actionTypes,
  // IMPORTS
  ...imports,
  // ACTIONS
  ...actions
};
