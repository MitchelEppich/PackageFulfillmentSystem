import actions from "../actions";

import OrderHandler from "../actions/orderHandler";
import User from "../actions/user";

import gql from "graphql-tag";
import { makePromise, execute } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";

const uri = "http://localhost:3000/graphql";

const imports = [];

const middleware = [
  store => {
    return next => {
      return action => {
        const result = next(action);
        // Operation Setup
        const link = new HttpLink({ uri, fetch: fetch });

        // if (true) return result;

        let who, task;
        // console.log(action);
        switch (action.type) {
          case actions.VERIFY_CREDENTIALS:
            if (action.user == null) break;
            task = "Attempted to log in";
            who = action.user.username;
            break;
          case actions.FOCUS_COMPANY:
            if (action.user == null) break;
            task = `Switched to ${action.name}`;
            who = action.user.username;
            break;
          case actions.FETCH_ORDER:
            // console.log(action.order);
            if (action.user == null) break;
            if (action.company == null) break;
            task = `Claimed order #${action.order.invoiceNumber} in ${
              action.company.short
            }`;
            who = action.user.username;

            let _order = action.order;
            _order.status = "in progress";
            _order.claimed = true;

            let orderHandlerActions = OrderHandler(uri);
            store.dispatch(
              orderHandlerActions.cacheOrder({
                ..._order,
                who: who,
                orderCache: action.orderCache
              })
            );
            break;
        }

        const operation = {
          query: mutation.createActionLog,
          variables: { who: who, task: task }
        };

        // Save to user as last action
        let userActions = User(uri);
        if (action.user != null && task != null)
          store.dispatch(
            userActions.updateUser({
              username: action.user.username,
              lastAction: task
            })
          );

        // Create Action Record
        if (task != null && who != null) {
          makePromise(execute(link, operation)).then(data => {
            // console.log(data);
          });
        }

        return result;
      };
    };
  }
];

const query = {};

const mutation = {
  createActionLog: gql`
    mutation($task: String, $who: String) {
      createActionLog(input: { task: $task, who: $who }) {
        _id
        who
        task
        createdAt
      }
    }
  `
};

export default [...middleware, ...imports];
