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
  EXPAND_ITEM: "EXPAND_ITEM",
  VERIFY_ITEM_LIST: "VERIFY_ITEM_LIST",
  REMOVE_ITEM_MISSED: "REMOVE_ITEM_MISSED"
};

const getActions = uri => {
  const objects = {
    clearItem: () => {
      return {
        type: actionTypes.CLEAR_ITEM
      };
    },
    setMutliItemBase: input => {
      return dispatch => {
        // Update Base Value
        input.itemBaseList[input.key] = input.value;

        // Update item values
        if (input.value.toString().length == 4) {
          let skipped = 0;
          for (let item = 0; item < input.item.quantity; item++) {
            let key = `${input.item.name}-${item}`;
            if (input.itemValues[key] == null || !input.itemValues[key].user) {
              input.itemValues[key] = {
                value: (parseInt(input.value) + item - skipped)
                  .toString()
                  .padStart(4, "0"),
                user: false
              };
              dispatch(objects.removeItemMissed({ item: key }));
            } else skipped++;
          }
        }

        dispatch({
          type: actionTypes.SET_MULTI_ITEM_BASE,
          itemBaseList: input.itemBaseList,
          itemValues: input.itemValues
        });
      };
    },
    setItemValue: input => {
      return dispatch => {
        input.itemValues[input.key] = {
          value: input.value,
          user: input.value != ""
        };

        dispatch(objects.removeItemMissed({ item: input.key }));

        dispatch({
          type: actionTypes.SET_ITEM_VALUE,
          itemValues: input.itemValues
        });
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
    removeItemMissed: input => {
      return {
        type: actionTypes.REMOVE_ITEM_MISSED,
        item: input.item
      };
    },
    verifyItemList: input => {
      console.log(input);
      let itemMissed = [];
      let keyList = Object.keys(input.itemList);

      let itemList = [];
      let _companies = Object.keys(input.order.item_list);
      for (let company of _companies) {
        let _quantities = Object.keys(input.order.item_list[company]);
        for (let quantity of _quantities) {
          let _items = Object.values(input.order.item_list[company][quantity]);
          for (let item of _items) {
            if (item.quantity == 1) {
              if (!keyList.includes(item.name)) {
                itemMissed.push(item.name);
              }
            } else {
              for (let i = 0; i < item.quantity; i++) {
                let itemName = `${item.name}-${i}`;
                if (!keyList.includes(itemName)) {
                  itemMissed.push(itemName);
                }
              }
            }
          }
        }
      }

      console.log(itemMissed);

      return {
        type: actionTypes.VERIFY_ITEM_LIST,
        input: itemMissed
      };
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
