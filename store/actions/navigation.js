/*******************************************/
/*User Actions for all user related
dispatch actions*/
/******************************************/

import gql from "graphql-tag";
import { makePromise, execute } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";

const actionTypes = {
  FOCUS_COMPANY: "FOCUS_COMPANY",
  FETCH_ORDER_LIST: "FETCH_ORDER_LIST",
  FETCH_ORDER: "FETCH_ORDER",
  FETCH_LOGS: "FETCH_LOGS",
  ORDER_CACHE: "ORDER_CACHE"
};

const getActions = uri => {
  const objects = {
    focusCompany: (input, orders) => {
      return dispatch => {
        let company = input.company;
        dispatch(
          objects.fetchOrderList({
            url: company.url,
            company: company,
            orderCache: input.orderCache,
            orders: orders
          })
        ).then(orders => {
          dispatch({
            type: actionTypes.FOCUS_COMPANY,
            input: { ...input.company, orders: orders },
            name: input.company.name,
            user: input.user
          });
        });
      };
    },
    fetchOrderList: input => {
      return dispatch => {
        const link = new HttpLink({ uri, fetch: fetch });

        const operation = {
          query: query.fetchOrderList,
          variables: { headers: JSON.stringify(input.headers), url: input.url }
        };

        return makePromise(execute(link, operation)).then(data => {
          let _order = JSON.parse(data.data.fetchOrderList);
          // 0 - Create 'orderCache'
          // 1 - Ensure that 'orderCache' is being passed into input
          // 2 - Ensure that 'focusCompany' is being passed into input
          // 3 - Objective -> Replace the current order list of said 'focusCompany' with the new order list which is passed in through input (you will have to use a -- for(let company of orderCache) --)
          // 4 - Call all order lists when user logs in
          // 5 - Visually show that an order list is CURRENTLY in the process of being fetched on the tabs and also on the 'update' button/icon/'last updated' text
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
    fetchOrder: input => {
      return dispatch => {
        if (input.company.short == "wholesale") {
          const link = new HttpLink({ uri, fetch: fetch });

          const operation = {
            query: query.fetchOrder,
            variables: { invoice_id: input.order.invoice_id }
          };

          return makePromise(execute(link, operation)).then(data => {
            let _new = JSON.parse(data.data.fetchOrder);
            dispatch({
              type: actionTypes.FETCH_ORDER,
              order: {
                ...input.order,
                item_list: _new.itemList,
                total_items: _new.totalItems
              },
              user: input.user,
              company: input.company
            });
            return Promise.resolve(_new);
          });
        } else {
          dispatch({
            type: actionTypes.FETCH_ORDER,
            order: input.order,
            user: input.user,
            company: input.company
          });
        }
      };
    },
    fetchLogs: input => {
      return dispatch => {
        const link = new HttpLink({ uri, fetch: fetch });

        const operation = {
          query: query.fetchLogs
          // variables: { invoice_id: input.order.invoice_id }
        };

        return makePromise(execute(link, operation)).then(data => {
          let _new = data.data.allLogs;
          dispatch({
            type: actionTypes.FETCH_LOGS,
            logs: _new
          });
          return Promise.resolve(_new);
        });
      };
    }
  };

  return { ...objects };
};
const query = {
  fetchOrderList: gql`
    query($headers: String, $url: String) {
      fetchOrderList(input: { headers: $headers, url: $url })
    }
  `,
  fetchOrder: gql`
    query($invoice_id: String) {
      fetchOrder(input: { invoice_id: $invoice_id })
    }
  `,
  fetchLogs: gql`
    query {
      allLogs {
        who
        task
        createdAt
      }
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
