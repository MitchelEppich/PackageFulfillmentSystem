/*******************************************/
/*User Actions for all user related
dispatch actions*/
/******************************************/

import gql from "graphql-tag";
import { makePromise, execute } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";
import Navigation from "./navigation";
import OrderHandler from "./orderHandler";
import Index from "./index";

const actionTypes = {
  SET_MULTI_ITEM_BASE: "SET_MULTI_ITEM_BASE",
  SET_ITEM_VALUE: "SET_ITEM_VALUE",
  CLEAR_ITEM: "CLEAR_ITEM",
  EXPAND_ITEM: "EXPAND_ITEM",
  VERIFY_ITEM_LIST: "VERIFY_ITEM_LIST",
  REMOVE_ITEM_MISSED: "REMOVE_ITEM_MISSED",
  MODIFY_VALUES: "MODIFY_VALUES"
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
        input.itemBases[input.key] = input.value;

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
                prefix: input.prefix,
                user: false
              };
              dispatch(objects.removeItemMissed({ item: key }));
            } else skipped++;
          }
        }

        dispatch({
          type: actionTypes.SET_MULTI_ITEM_BASE,
          itemBases: input.itemBases,
          itemValues: input.itemValues
        });
      };
    },
    setItemValue: input => {
      return dispatch => {
        input.itemValues[input.key] = {
          value: input.value,
          user: input.value != "",
          prefix: input.prefix,
          packageId: input.packageId
        };

        dispatch(objects.removeItemMissed({ item: input.key }));

        dispatch({
          type: actionTypes.SET_ITEM_VALUE,
          itemValues: input.itemValues
        });
      };
    },
    modifyValues: input => {
      return {
        type: actionTypes.MODIFY_VALUES,
        input: JSON.parse(input.entryContent)
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
      return dispatch => {
        let _res;
        const link = new HttpLink({ uri, fetch: fetch });

        const operation = { query: query.getSttCache };

        return makePromise(execute(link, operation))
          .then(data => {
            let _cachedValues = data.data.allSttCaches;
            let itemMissed = {};

            let _companies = Object.keys(input.order.itemList);
            for (let company of _companies) {
              let _quantities = Object.keys(input.order.itemList[company]);
              for (let quantity of _quantities) {
                let _items = Object.values(
                  input.order.itemList[company][quantity]
                );
                for (let item of _items) {
                  // if (item.quantity == 1) {
                  let _itemValue = input.itemValues[item.name];
                  if (
                    _itemValue == null ||
                    _itemValue.value.toString().length != 4
                  ) {
                    itemMissed[item.name] = "missed";
                  } else {
                    let _sttNumber = _itemValue.prefix + _itemValue.value;
                    if (_cachedValues.includes(_sttNumber)) {
                      itemMissed[item.name] = "used";
                    }
                  }
                  // } else {
                  //   for (let i = 0; i < item.quantity; i++) {
                  //     let itemName = `${item.name}-${i}`;
                  //     if (!keyList.includes(itemName)) {
                  //       itemMissed.push(itemName);
                  //     }
                  //   }
                  // }
                }
              }
            }

            if (Object.keys(itemMissed).length == 0) {
              let NavActions = Navigation(uri);
              dispatch(
                NavActions.postOrder({
                  focusCompany: input.focusCompany,
                  itemList: input.itemValues,
                  focusOrder: input.order
                })
              );
              let OrderHandlerActions = OrderHandler(uri);
              dispatch(
                OrderHandlerActions.updateOrder({
                  status: "finalized",
                  claimed: false,
                  entryContent: JSON.stringify({
                    itemValues: input.itemValues,
                    itemBases: input.itemBases
                  }),
                  invoiceNumber: input.order.invoiceNumber,
                  orderCache: input.orderCache
                })
              );
              _res = "finalized";
            }

            dispatch({
              type: actionTypes.VERIFY_ITEM_LIST,
              input: itemMissed
            });
            return _res;
          })
          .catch(error => console.log(error));
      };
    }
  };

  return { ...objects };
};
const query = {
  getSttCache: gql`
    query {
      allSttCaches
    }
  `
};

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
