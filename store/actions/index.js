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

import User from "./user";
import Nav from "./navigation";
import Item from "./itemHandler";
import Order from "./orderHandler";

const uri = "http://localhost:3000/graphql";

const imports = {
  ...User(uri),
  ...Nav(uri),
  ...Item(uri),
  ...Order(uri)
};

const actionTypes = {
  TOGGLE_SCREEN: "TOGGLE_SCREEN",
  TOGGLE_LOGIN_SCREEN: "TOGGLE_LOGIN_SCREEN",
  TOGGLE_SHOW_REGISTER_SCREEN: "TOGGLE_SHOW_REGISTER_SCREEN",
  TOGGLE_SHOW_LOG: "TOGGLE_SHOW_LOG",
  TOGGLE_USERS_SCREEN: "TOGGLE_USERS_SCREEN"
};

const actions = {
  toggleScreen: () => {
    return {
      type: actionTypes.TOGGLE_SCREEN
    };
  },
  toggleUsersScreen: () => {
    return {
      type: actionTypes.TOGGLE_USERS_SCREEN
    };
  },
  toggleLoginScreen: () => {
    return {
      type: actionTypes.TOGGLE_LOGIN_SCREEN
    };
  },
  toggleRegisterScreen: () => {
    return {
      type: actionTypes.TOGGLE_SHOW_REGISTER_SCREEN
    };
  },
  toggleShowLog: () => {
    return {
      type: actionTypes.TOGGLE_SHOW_LOG
    };
  }
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
