import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
// import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
    },
  };
});

const result = "http://localhost:3500/admin";

const httpLink = createHttpLink({
  uri: result,
  credentials: "include",
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
