import axios from "axios";
import { ApolloProvider } from "@apollo/client";
import { AuthContextProvider } from "../contexts/authContext";
import client from "../libs/apollo-client";
import "../styles/globals.css";

axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </ApolloProvider>
  );
}

export default MyApp;
