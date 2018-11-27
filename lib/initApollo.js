import { ApolloClient } from "apollo-boost";
import { HttpLink } from "apollo-boost";
import { InMemoryCache } from "apollo-boost";
import { setContext } from "apollo-link-context";
import fetch from "isomorphic-unfetch";

import { split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import ws from "ws";

const uri = `http://localhost:3000/graphql`;
const subscriptionsURI = `ws://localhost:3000/subscriptions`;

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

const httpLink = new HttpLink({
  uri: uri
});

const authLink = new setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = sessionStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const wsLink = process.browser
  ? new WebSocketLink(
      {
        uri: subscriptionsURI,
        options: {
          reconnect: true
        }
      },
      ws
    )
  : null;
// const wssLink = process.browser
//   ? new WebSocketLink(
//       {
//         uri: subscriptionsURI,
//         options: {
//           reconnect: true
//         }
//       },
//       wss
//     )
//   : null;

const link = process.browser
  ? split(
      // split based on operation type
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === "OperationDefinition" && operation === "subscription";
      },
      wsLink,
      // wssLink,
      httpLink
    )
  : httpLink;

function create(initialState) {
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(link),
    cache: new InMemoryCache().restore(initialState || {})
  });
}

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
