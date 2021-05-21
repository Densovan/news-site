import "../styles/globals.css";
import { UserProvider } from "../contexts/userContext";
import axios from "axios";
import { ApolloProvider } from "@apollo/client";
import { AuthContextProvider } from "../contexts/authContext";
import client from "../apollo-client";

axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <UserProvider>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </UserProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
