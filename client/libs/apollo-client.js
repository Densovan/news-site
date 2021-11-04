// import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
// import { setContext } from "@apollo/client/link/context";
// const server = process.env.API_SECRET;
// const server_local = process.env.API_SECRET_LOCAL;
// const develop = process.env.NODE_ENV;
// import Cookies from "js-cookie";

// const URL_ACCESS = develop === "development" ? server_local : server;
// console.log(URL_ACCESS);

// const result = `${URL_ACCESS}/api`;
// const resultPrivate = `${URL_ACCESS}/private`;

// const httpLink = createHttpLink({
//   uri: result,
//   credentials: "include",
// });

// const authLink = setContext((_, { headers }) => {
//   let accessToken = Cookies.get("access_token");
//   // const accessToken = localStorage.getItem("access_token"); // with SSO
//   // console.log("Apollo Get Token: ", accessToken);
//   return {
//     headers: {
//       ...headers,
//       authorization: accessToken ? `Bearer ${accessToken}` : "", // with SSO
//     },
//   };
// });

// const client = new ApolloClient({
//   // link: splitLink,
//   // ssrMode: typeof window === "undefined",
//   link: authLink.concat(httpLink),
//   tials: "same-origin",
//   cache: new InMemoryCache(),
// });

// export default client;

import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
const server = process.env.API_SECRET;
const server_local = process.env.API_SECRET_LOCAL;
const develop = process.env.NODE_ENV;
import Cookies from "js-cookie";

const URL_ACCESS = develop === "development" ? server_local : server;
const result = `${URL_ACCESS}/api`;

const authLink = setContext((_, { headers }) => {
  let accessToken = Cookies.get("access_token");
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

// const result = "https://backend.smallworldventure.com/graphql?";
// const result = "http://localhost:5000/graphql?";

const httpLink = createHttpLink({
  uri: result,
  credentials: "include",
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
