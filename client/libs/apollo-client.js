import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

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

const client = new ApolloClient({
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
