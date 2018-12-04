/*******************************************/
/*User Actions for all user related
dispatch actions*/
/******************************************/

import gql from "graphql-tag";
import { makePromise, execute } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";

const actionTypes = {
  CACHE_ORDER: "CACHE_ORDER",
  MODIFY_CLAIMS: "MODIFY_CLAIMS",
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
          variables: { ...input }
        };

        makePromise(execute(link, operation)).then(data => {
          let _order = data.data.cacheOrder;
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
    modifyClaims: input => {
      return dispatch => {
        let _claimedOrders = input.claimedOrders;
        let _order = input.order;

        if (input.append) {
          _claimedOrders.push(_order.invoice_number);
        } else {
          _claimedOrders = _claimedOrders.filter(a => {
            if (a == _order.invoice_number) return false;
            return true;
          });
        }

        dispatch(
          objects.updateCache({ orderCache: input.orderCache, order: _order })
        );

        dispatch({
          type: actionTypes.MODIFY_CLAIMS,
          input: _claimedOrders
        });
      };
    },
    updateCache: input => {
      let _orderCache = input.orderCache;
      let _order = input.order;
      _order = { ..._order, ...JSON.parse(_order.content) };

      let _company = _order.invoice_number.split("-")[2].toLowerCase();
      if (_orderCache[_company] == null) return;
      let index = 0;
      for (let _o of _orderCache[_company].order) {
        if (_o.invoice_number == _order.invoice_number) {
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
      $content: String
      $status: String
      $who: String
      $claimed: Boolean
      $invoiceId: String
    ) {
      cacheOrder(
        input: {
          content: $content
          status: $status
          who: $who
          claimed: $claimed
          invoiceId: $invoiceId
        }
      ) {
        _id
        content
        lastUpdate
        status
        claimed
        editBy
      }
    }
  `,
  updateOrder: gql`
    mutation(
      $content: String
      $status: String
      $who: String
      $claimed: Boolean
      $invoiceId: String
    ) {
      updateOrder(
        input: {
          content: $content
          status: $status
          who: $who
          claimed: $claimed
          invoiceId: $invoiceId
        }
      ) {
        _id
        content
        lastUpdate
        status
        claimed
        editBy
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
