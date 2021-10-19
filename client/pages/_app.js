import React, { useEffect, useState } from "react";
import axios from "axios";
import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from "../layouts/layoutAuth";
import client from "../libs/apollo-client";
import "../styles/globals.css";
import { ProtectRoute } from '../contexts/protectRoute';

axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }) {
  const [token, setToken] = useState(null)
  useEffect(() => {
    const token = localStorage.getItem('access_token')
    setToken(token);
  },[])
  const getLayout = Component.getLayout || ((page) => <ApolloProvider client={client}><AuthProvider token={token}>{page}</AuthProvider></ApolloProvider>)
  return getLayout(
    <ProtectRoute>
      <Component {...pageProps} />
    </ProtectRoute>
  )
}

export default MyApp;
