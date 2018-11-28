/*******************************************/
/*User Actions for all user related
dispatch actions*/
/******************************************/

import gql from "graphql-tag";
import { makePromise, execute } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";

const actionTypes = {
  SET_MULTI_ITEM_BASE: "SET_MULTI_ITEM_BASE",
  SET_ITEM_VALUE: "SET_ITEM_VALUE",
  CLEAR_ITEM: "CLEAR_ITEM",
  EXPAND_ITEM: "EXPAND_ITEM"
};

const getActions = uri => {
  const objects = {
    clearItem: () => {
      return {
        type: actionTypes.CLEAR_ITEM
      };
    },
    setMutliItemBase: input => {
      // Update Base Value
      input.itemBaseList[input.key] = input.value;

      // Update item values
      if (input.value.toString().length == 4) {
        let skipped = 0;
        for (let item = 0; item < input.item.quantity; item++) {
          let key = `${input.item.name}-${item}`;
          if (input.itemValues[key] == null || !input.itemValues[key].user)
            input.itemValues[key] = {
              value: (parseInt(input.value) + item - skipped)
                .toString()
                .padStart(4, "0"),
              user: false
            };
          else skipped++;
        }
      }

      return {
        type: actionTypes.SET_MULTI_ITEM_BASE,
        itemBaseList: input.itemBaseList,
        itemValues: input.itemValues
      };
    },
    setItemValue: input => {
      input.itemValues[input.key] = {
        value: input.value,
        user: input.value != ""
      };

      return {
        type: actionTypes.SET_ITEM_VALUE,
        itemValues: input.itemValues
      };
    },
    expandItem: input => {
      if (input.expandItems.includes(input.item))
        input.expandItems = input.expandItems.filter(a => {
          if (a == input.item) return false;
          return true;
        });
      else input.expandItems.push(input.item);
      return {
        type: actionTypes.EXPAND_ITEM,
        input: input.expandItems
      };
    },
    verifyItemList: input => {
      console.log(input);
    }
  };

  return { ...objects };
};
const query = {};

const mutation = {};

export default uri => {
  const actions = getActions(uri);
  return {
    // TYPES
    ...actionTypes,
    // ACTIONS
    ...actions
  };
};
