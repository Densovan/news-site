import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(undefined);
  async function getLoggedIn() {
    const loggedInRes = await axios.get(
      "http://localhost:3500/auth/verifyToken"
    );
    if (loggedInRes.data === true) {
      await axios.post("http://localhost:3500/auth/refresh-token");
      setInterval(async () => {
        await axios.post("http://localhost:3500/auth/refresh-token");
      }, 1800000);
    }
    setLoggedIn(loggedInRes.data);
  }
  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
