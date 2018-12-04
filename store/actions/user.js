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
  RELEASE_CREDENTIALS: "RELEASE_CREDENTIALS",
  REGISTER_CREDENTIALS: "REGISTER_CREDENTIALS",
  UPDATE_USER: "UPDATE_USER"
};

const getActions = uri => {
  const objects = {
    releaseCredentials: input => {
      return dispatch => {
        sessionStorage.setItem("token", "");
        dispatch(
          objects.updateUser({ username: input.username, online: false })
        );
        dispatch({ type: actionTypes.RELEASE_CREDENTIALS });
      };
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
    },
    registerCredentials: input => {
      return dispatch => {
        const link = new HttpLink({
          uri,
          fetch: fetch
        });
        const operation = {
          query: mutation.registerCredentials,
          variables: {
            name: input.name,
            admin: input.admin
          }
        };
        return makePromise(execute(link, operation)).then(data => {
          let user = data.data.registerCredentials;
          dispatch({
            type: actionTypes.REGISTER_CREDENTIALS,
            user: user
          });
          return Promise.resolve(user);
        });
      };
    },
    updateUser: input => {
      return dispatch => {
        const link = new HttpLink({
          uri,
          fetch: fetch
        });
        const operation = {
          query: mutation.updateUser,
          variables: {
            username: input.username,
            locked: input.locked,
            admin: input.admin,
            lastAction: input.lastAction,
            online: input.online
          }
        };
        return makePromise(execute(link, operation)).then(data => {
          let user = data.data.updateUser;
          dispatch({
            type: actionTypes.UPDATE_USER,
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
        username
        name
        badge
        locked
        token
        admin
        createdAt
        online
      }
    }
  `
};

const mutation = {
  verifyCredentials: gql`
    mutation($username: String, $badge: String) {
      verifyCredentials(input: { username: $username, badge: $badge }) {
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
  updateUser: gql`
    mutation(
      $locked: Boolean
      $admin: Boolean
      $lastAction: String
      $online: Boolean
      $username: String
    ) {
      updateUser(
        input: {
          username: $username
          locked: $locked
          lastAction: $lastAction
          admin: $admin
          online: $online
        }
      ) {
        username
        name
        badge
        locked
        admin
        online
        lastAction
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
