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
  UPDATE_ORDER: "UPDATE_ORDER"
};

const getActions = uri => {
  const objects = {
    cacheOrder: input => {
      return dispatch => {
        const link = new HttpLink({ uri, fetch: fetch });

        const operation = {
          query: mutation.cacheOrder,
          variables: { ...input }
        };

        makePromise(execute(link, operation)).then(data => {
          dispatch({
            type: actionTypes.CACHE_ORDER
          });
        });
      };
    },
    updateOrder: input => {
      return dispatch => {
        console.log(input);
        const link = new HttpLink({ uri, fetch: fetch });

        const operation = {
          query: mutation.updateOrder,
          variables: { ...input }
        };

        makePromise(execute(link, operation)).then(data => {
          console.log(data);
          dispatch({
            type: actionTypes.UPDATE_ORDER
          });
        });
      };
    },
    modifyClaims: input => {
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

      return {
        type: actionTypes.MODIFY_CLAIMS,
        input: _claimedOrders
      };
    }
  };

  return { ...objects };
};
const query = {};

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
