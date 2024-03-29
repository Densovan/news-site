import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const server = process.env.API_SECRET;
  const server_local = process.env.API_SECRET_LOCAL;
  const develop = process.env.NODE_ENV;
  const URL_ACCESS = develop === "development" ? server_local : server;

  const [loggedIn, setLoggedIn] = useState(undefined);
  async function getLoggedIn() {
    const loggedInRes = await axios.get(`${URL_ACCESS}/auth/verifyToken/`);
    if (loggedInRes.data === true) {
      await axios.post(`${URL_ACCESS}/auth/refresh-token/`);
      setInterval(async () => {
        await axios.post(`${URL_ACCESS}/auth/refresh-token/`);
      }, 1800000);
    }
    setLoggedIn(loggedInRes.data);
  }
  useEffect(() => {
    getLoggedIn();
  }, []);
  // console.log(loggedIn);
  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
