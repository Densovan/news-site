import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
const server = process.env.API_SECRET;
const server_local = process.env.API_SECRET_LOCAL;
const develop = process.env.NODE_ENV;

const URL_ACCESS = develop === "development" ? server_local : server;
console.log(URL_ACCESS);

const result = `${URL_ACCESS}/api`;
const resultPrivate = `${URL_ACCESS}/private`;

const httpLink = createHttpLink({
  uri: result,
  credentials: "include",
});

// const client = new ApolloClient({
//   link: ApolloLink.split(
//     (operation) => operation.getContext().clientName === "private",
//     // the string "third-party" can be anything you want,
//     // we will use it in a bit
//     authLink.concat(httLinkPrivate), // <= apollo will send to this if clientName is "private"
//     authLink.concat(httpLink) // <= otherwise will send to this
//   ),
//   // other options
//   credentials: "same-origin",
//   cache: new InMemoryCache(),
// });
const authLink = setContext((_, { headers }) => {
  const accessToken = localStorage.getItem("access_token"); // with SSO
  // console.log("Apollo Get Token: ", accessToken);
  return {
    headers: {
      ...headers,
      "x-access-token": accessToken ? `Bearer ${accessToken}` : "", // with SSO
    },
  };
});

const client = new ApolloClient({
  // link: splitLink,
  // ssrMode: typeof window === "undefined",
  link: authLink.concat(httpLink),
  tials: "same-origin",
  cache: new InMemoryCache(),
});

export default client;

// import {
//   ApolloClient,
//   createHttpLink,
//   InMemoryCache,
//   split,
// } from "@apollo/client";
// import { setContext } from "@apollo/client/link/context";
// import { WebSocketLink } from "@apollo/client/link/ws";
// // import { WebSocketLink } from "@apollo/link-ws";
// // import { WebSocketLink } from "apollo-link-ws";
// import { getMainDefinition } from "@apollo/client/utilities";
// const authLink = setContext((_, { headers }) => {
//   return {
//     headers: {
//       ...headers,
//     },
//   };
// });
// const server = process.env.API_SECRET;
// const server_local = process.env.API_SECRET_LOCAL;
// const develop = process.env.NODE_ENV;

// const URL_ACCESS = develop === "development" ? server_local : server;

// const result = `${URL_ACCESS}/api`;

// // const httpLink = createHttpLink({
// //   uri: result,
// //   credentials: "include",
// // });

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

// const client = new ApolloClient({
//   link: splitLink,
//   // link: authLink.concat(httpLink),
//   credentials: "same-origin",
//   cache: new InMemoryCache(),
// });

// export default client;
