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
  FETCH_ORDER: "FETCH_ORDER"
};

const getActions = uri => {
  const objects = {
    focusCompany: input => {
      return dispatch => {
        dispatch(objects.fetchOrderList()).then(orders => {
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
          query: query.fetchOrderList
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
            order: { ...input.order, item_list: _new }
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
    query {
      fetchOrderList
    }
  `,
  fetchOrder: gql`
    query($invoice_id: String) {
      fetchOrder(input: { invoice_id: $invoice_id })
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
