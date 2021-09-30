import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import cookie from 'js-cookie'
import { ApolloProvider } from "@apollo/client";
import { useRouter } from 'next/router';
import { AuthContextProvider } from "../contexts/authContext";
import LayoutAuth from '../components/Layouts/layoutAuth';
import LayoutDefault from '../components/Layouts/layoutDefault';
import client from "../libs/apollo-client";
import "../styles/globals.css";

axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }) {

  // const router = useRouter();
  // const server = process.env.API_SECRET;
  // const server_local = process.env.API_SECRET_LOCAL;
  // const develop = process.env.NODE_ENV;
  // const URL_ACCESS = develop === "development" ? server_local : server;

  // const [loggedIn, setLoggedIn] = useState(false)

  // async function getLoggedIn() {
  //   const loggedInRes = await axios.get(`${URL_ACCESS}/auth/verifyToken/`);
  //   if (loggedInRes.data === true) {
  //     await axios.post(`${URL_ACCESS}/auth/refresh-token/`);
  //     setInterval(async () => {
  //       await axios.post(`${URL_ACCESS}/auth/refresh-token/`);
  //     }, 1800000);
  //   }
  //   setLoggedIn(loggedInRes.data);
  // }
  // useEffect(() => {
  //   getLoggedIn();    
  // }, []);

  // const getLayout = Component.getLayout || ((page) => <LayoutDefault loggedIn={loggedIn}>{page}</LayoutDefault>)
  // return getLayout(
  //   <ApolloProvider client={client}>
  //     <Component {...pageProps} loggedIn={loggedIn} />
  //   </ApolloProvider>
  // );
  return(
    <ApolloProvider client={client}>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </ApolloProvider>
  )
}

export default MyApp;
