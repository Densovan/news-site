import "../styles/globals.css";
import { UserProvider } from "../contexts/userContext";
import axios from "axios";
import { ApolloProvider } from "@apollo/client";
import { AuthContextProvider } from "../contexts/authContext";
import client from "../apollo-client";

axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <AuthContextProvider>
        {/* <UserProvider> */}
        <Component {...pageProps} />
        {/* </UserProvider> */}
      </AuthContextProvider>
    </ApolloProvider>
  );
}

export default MyApp;
