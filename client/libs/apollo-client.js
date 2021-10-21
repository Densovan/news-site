import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
const server = process.env.API_SECRET;
const server_local = process.env.API_SECRET_LOCAL;
const develop = process.env.NODE_ENV;
import Cookies from "js-cookie";

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
  let accessToken = Cookies.get("access_token");
  // const accessToken = localStorage.getItem("access_token"); // with SSO
  // console.log("Apollo Get Token: ", accessToken);
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "", // with SSO
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

// import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
// import Cookies from "js-cookie";
// const baseUrl = process.env.API_URL;
// const server = process.env.API_SECRET;
// const server_local = process.env.API_SECRET_LOCAL;
// const develop = process.env.NODE_ENV;

// const URL_ACCESS = develop === "development" ? server_local : server;

// function createApolloClient() {
//   // let accessToken = Cookies.get("access_token");
//   const accessToken = localStorage.getItem("access_token");
//   return new ApolloClient({
//     ssrMode: typeof window === "undefined",
//     link: new HttpLink({
//       uri: `${URL_ACCESS}/api`,
//       credentials: "include",
//       headers: {
//         "x-access-token": accessToken ? `Bearer ${accessToken}` : "",
//       },
//     }),
//     cache: new InMemoryCache(),
//   });
// }

// export default createApolloClient;
