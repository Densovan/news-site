import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(undefined);
  async function getLoggedIn() {
    const loggedInRes = await axios.get(
      "https://backend.beecolony.org/auth/verifyToken/"
    );
    if (loggedInRes.data === true) {
      await axios.post("https://backend.beecolony.org/auth/refresh-token/");
      setInterval(async () => {
        await axios.post("https://backend.beecolony.org/auth/refresh-token/");
      }, 1800000);
    }
    setLoggedIn(loggedInRes.data);
  }
  useEffect(() => {
    getLoggedIn();
  }, []);
  console.log(loggedIn);
  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
