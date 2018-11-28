/*******************************************/
/*User Actions for all user related
dispatch actions*/
/******************************************/

import gql from "graphql-tag";
import { makePromise, execute } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";

const actionTypes = {
  VERIFY_CREDENTIALS: "VERIFY_CREDENTIALS",
  FETCH_CREDENTIALS: "FETCH_CREDENTIALS",
  RELEASE_CREDENTIALS: "RELEASE_CREDENTIALS"
};

const getActions = uri => {
  const objects = {
    releaseCredentials: () => {
      sessionStorage.setItem("token", "");
      return { type: actionTypes.RELEASE_CREDENTIALS };
    },
    fetchCredentials: () => {
      return dispatch => {
        const link = new HttpLink({ uri, fetch: fetch });
        const token = sessionStorage.getItem("token");
        const operation = {
          query: query.getCredentials,
          variables: { token: token }
        };
        return makePromise(execute(link, operation))
          .then(data => {
            let user = data.data.user;
            if (user == null) return;
            sessionStorage.setItem("token", user.token);
            dispatch({
              type: actionTypes.FETCH_CREDENTIALS,
              user: user
            });
            return Promise.resolve(user);
          })
          .catch(error => console.log(error));
      };
    },
    verifyCredentials: input => {
      return dispatch => {
        const link = new HttpLink({
          uri,
          fetch: fetch
        });
        const operation = {
          query: mutation.verifyCredentials,
          variables: {
            name: input.name,
            username: input.username,
            badge: input.badge
          }
        };
        return makePromise(execute(link, operation)).then(data => {
          let user = data.data.verifyCredentials;
          if (user == null) return;
          sessionStorage.setItem("token", user.token);
          dispatch({
            type: actionTypes.VERIFY_CREDENTIALS,
            user: user
          });
          return Promise.resolve(user);
        });
      };
    }
  };

  return { ...objects };
};
const query = {
  getCredentials: gql`
    query($token: String) {
      user(input: { token: $token }) {
        _id
        username
        name
        badge
        locked
        token
        admin
        createdAt
      }
    }
  `
};

const mutation = {
  verifyCredentials: gql`
    mutation($username: String, $badge: String) {
      verifyCredentials(input: { username: $username, badge: $badge }) {
        _id
        username
        name
        badge
        locked
        token
        admin
        createdAt
      }
    }
  `,
  registerCredentials: gql`
    mutation($name: String, $admin: Boolean) {
      registerCredentials(input: { name: $name, admin: $admin }) {
        _id
        username
        name
        badge
        locked
        token
        admin
        createdAt
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
