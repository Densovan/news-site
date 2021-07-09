import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
// import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { cache } from "./components/cache/cache";

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
  // uri: "http://localhost:3600/graphql",
  // uri: "http://localhost:3500/api",
  cache,
});

export default client;
