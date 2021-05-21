import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  // uri: "http://localhost:3600/graphql",
  uri: "http://localhost:3500/api",
  cache: new InMemoryCache(),
});

export default client;
