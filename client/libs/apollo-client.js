import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
// import { WebSocketLink } from "@apollo/client/link/ws";
// import { WebSocketLink } from "@apollo/link-ws";
// import { WebSocketLink } from "apollo-link-ws";
// import { getMainDefinition } from "@apollo/client/utilities";
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
    },
  };
});
const server = process.env.API_SECRET;
const server_local = process.env.API_SECRET_LOCAL;
const develop = process.env.NODE_ENV;

const URL_ACCESS = develop === "development" ? server_local : server;

const result = `${URL_ACCESS}/api`;

const httpLink = createHttpLink({
  uri: result,
  credentials: "include",
});

// const wsLink = process.browser
//   ? new WebSocketLink({
//       uri: `ws://localhost:3500/api`, // Can test with your Slash GraphQL endpoint (if you're using Slash GraphQL)
//       options: {
//         reconnect: true,
//       },
//     })
//   : null;
// const httpLink = createHttpLink({
//   uri: result,
//   credentials: "include",
// });

// const splitLink = process.browser
//   ? split(
//       ({ query }) => {
//         const definition = getMainDefinition(query);
//         return (
//           definition.kind === "OperationDefinition" &&
//           definition.operation === "subscription"
//         );
//       },
//       wsLink,
//       authLink.concat(httpLink)
//     )
//   : authLink.concat(httpLink);

const client = new ApolloClient({
  // splitLink,
  link: authLink.concat(httpLink),
  credentials: "same-origin",
  cache: new InMemoryCache(),
});

export default client;

// import { ApolloClient } from "apollo-client";
// import { InMemoryCache } from "apollo-cache-inmemory";
// import { HttpLink } from "apollo-link-http";
// import fetch from "isomorphic-unfetch";

// export default function createApolloClient(initialState, ctx) {
//   // The `ctx` (NextPageContext) will only be present on the server.
//   // use it to extract auth headers (ctx.req) or similar.
//   return new ApolloClient({
//     ssrMode: Boolean(ctx),
//     link: new HttpLink({
//       uri: "http://localhost:3500/api", // Server URL (must be absolute)
//       credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
//       fetch,
//     }),
//     cache: new InMemoryCache().restore(initialState),
//   });
// }
