import actions from "../actions";

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
        }

        const operation = {
          query: mutation.createActionLog,
          variables: { who: who, task: task }
        };

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
