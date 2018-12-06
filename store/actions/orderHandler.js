/*******************************************/
/*User Actions for all user related
dispatch actions*/
/******************************************/

import gql from "graphql-tag";
import { makePromise, execute } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";
import Navigation from "./navigation";

const actionTypes = {
  CACHE_ORDER: "CACHE_ORDER",
  MODIFY_ORDER: "MODIFY_ORDER",
  UPDATE_ORDER: "UPDATE_ORDER",
  FETCH_ORDER_LIST: "FETCH_ORDER_LIST",
  UPDATE_CACHE: "UPDATE_CACHE"
};

const getActions = uri => {
  const objects = {
    fetchOrderList: input => {
      return dispatch => {
        const link = new HttpLink({ uri, fetch: fetch });

        const operation = {
          query: query.fetchOrderList,
          variables: { url: input.url }
        };

        return makePromise(execute(link, operation)).then(data => {
          let _order = JSON.parse(data.data.fetchOrderList);
          input.orderCache[input.company.short] = {
            order: _order,
            updatedAt: new Date()
          };
          dispatch({
            type: actionTypes.FETCH_ORDER_LIST,
            input: input.orderCache
          });
          return Promise.resolve(_order);
        });
      };
    },
    cacheOrder: input => {
      return dispatch => {
        const link = new HttpLink({ uri, fetch: fetch });

        const operation = {
          query: mutation.cacheOrder,
          variables: { ...input, itemContent: JSON.stringify(input.itemList) }
        };
        makePromise(execute(link, operation)).then(data => {
          let _order = data.data.cacheOrder;
          _order.itemList = input.itemList;

          dispatch(
            objects.updateCache({
              orderCache: input.orderCache,
              order: _order
            })
          );
          dispatch({
            type: actionTypes.CACHE_ORDER
          });
        });
      };
    },
    updateOrder: input => {
      return dispatch => {
        const link = new HttpLink({ uri, fetch: fetch });

        const operation = {
          query: mutation.updateOrder,
          variables: { ...input }
        };

        makePromise(execute(link, operation)).then(data => {
          let _order = data.data.updateOrder;
          dispatch(
            objects.updateCache({ orderCache: input.orderCache, order: _order })
          );
          dispatch({
            type: actionTypes.UPDATE_ORDER
          });
        });
      };
    },
    modifyOrder: input => {
      return dispatch => {
        let _order = input.order;
        let _focusOrder = input.focusOrder;

        if (_order.invoiceNumber == _focusOrder.invoiceNumber) {
          let NavActions = Navigation(uri);
          dispatch(NavActions.modifyFocusOrder({ order: _order }));
        }

        dispatch(
          objects.updateCache({ orderCache: input.orderCache, order: _order })
        );

        dispatch({
          type: actionTypes.MODIFY_ORDER
        });
      };
    },
    updateCache: input => {
      let _orderCache = input.orderCache;
      let _order = input.order;

      let _company = _order.invoiceNumber.split("-")[2];
      if (_company == null) _company = "wholesale";
      else _company = _company.toLowerCase();
      if (_orderCache[_company] == null) return;
      let index = 0;
      for (let _o of _orderCache[_company].order) {
        if (_o.invoiceNumber == _order.invoiceNumber) {
          _orderCache[_company].order[index] = _order;
          break;
        }
        index++;
      }

      return {
        type: actionTypes.UPDATE_CACHE,
        input: _orderCache
      };
    }
  };

  return { ...objects };
};
const query = {
  fetchOrderList: gql`
    query($url: String) {
      fetchOrderList(input: { url: $url })
    }
  `
};

const mutation = {
  cacheOrder: gql`
    mutation(
      $invoiceId: String
      $invoiceNumber: String
      $itemContent: String
      $entryContent: String
      $orderDate: String
      $customerName: String
      $status: String
      $who: String
      $claimed: Boolean
      $notes: [String]
    ) {
      cacheOrder(
        input: {
          invoiceId: $invoiceId
          invoiceNumber: $invoiceNumber
          itemContent: $itemContent
          entryContent: $entryContent
          orderDate: $orderDate
          customerName: $customerName
          status: $status
          who: $who
          claimed: $claimed
          notes: $notes
        }
      ) {
        invoiceId
        invoiceNumber
        itemContent
        entryContent
        orderDate
        customerName
        lastUpdate
        status
        claimed
        editBy
        notes
      }
    }
  `,
  updateOrder: gql`
    mutation(
      $invoiceId: String
      $invoiceNumber: String
      $itemContent: String
      $entryContent: String
      $orderDate: String
      $customerName: String
      $status: String
      $who: String
      $claimed: Boolean
      $note: String
    ) {
      updateOrder(
        input: {
          invoiceId: $invoiceId
          invoiceNumber: $invoiceNumber
          itemContent: $itemContent
          entryContent: $entryContent
          orderDate: $orderDate
          customerName: $customerName
          status: $status
          who: $who
          claimed: $claimed
          note: $note
        }
      ) {
        invoiceId
        invoiceNumber
        itemContent
        entryContent
        orderDate
        customerName
        lastUpdate
        status
        claimed
        editBy
        notes
      }
    }
  `
};

export default uri => {
  const actions = getActions(uri);
  return {
    // TYPES
    ...actionTypes,
    // ACTIONS
    ...actions
  };
};
