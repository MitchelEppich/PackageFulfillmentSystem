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
  FETCH_LOGS: "FETCH_LOGS"
};

const getActions = uri => {
  const objects = {
    focusCompany: input => {
      return dispatch => {
        let company = input.company;
        dispatch(
          objects.fetchOrderList({
            url: company.url,
            headers:
              company.headers != null ? JSON.stringify(company.headers) : ""
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
          dispatch({
            type: actionTypes.FETCH_ORDER_LIST
          });
          return Promise.resolve(JSON.parse(data.data.fetchOrderList));
        });
      };
    },
    fetchOrder: input => {
      return dispatch => {
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
