// import React, { createContext, useEffect, useState } from "react";
// import axios from "axios";

// const AuthContext = createContext();

// const AuthContextProvider = (props) => {
//   const server = process.env.API_SECRET;
//   const server_local = process.env.API_SECRET_LOCAL;
//   const develop = process.env.NODE_ENV;
//   const URL_ACCESS = develop === "development" ? server_local : server;

//   const [loggedIn, setLoggedIn] = useState(undefined);
//   async function getLoggedIn() {
//     const loggedInRes = await axios.get(`${URL_ACCESS}/auth/verifyToken/`);
//     if (loggedInRes.data === true) {
//       await axios.post(`${URL_ACCESS}/auth/refresh-token/`);
//       setInterval(async () => {
//         await axios.post(`${URL_ACCESS}/auth/refresh-token/`);
//       }, 1800000);
//     }
//     setLoggedIn(loggedInRes.data);
//   }
//   useEffect(() => {
//     getLoggedIn();
//   }, []);
//   return (
//     <React.Fragment>
//       <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
//         {props.children}
//       </AuthContext.Provider>
//     </React.Fragment>
//   );
// };

// export default AuthContext;
// export { AuthContextProvider };
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const server = process.env.API_SECRET;
  const server_local = process.env.API_SECRET_LOCAL;
  const develop = process.env.NODE_ENV;
  const URL_ACCESS = develop === "development" ? server_local : server;

  const [loggedIn, setLoggedIn] = useState(undefined);
  const [statusCode, setStatusCode] = useState();
  async function getLoggedIn() {
    await axios
      .get("https://accounts.koompi.com/verify-token", {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("refresh_token")}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.access_token);
        setLoggedIn(res.data.access_token);
      })
      .catch(async (err) => {
        if (err.response.status === 401 || err.response.status === 403) {
          await localStorage.removeItem("access_token");
          await localStorage.removeItem("refresh_token");
          setStatusCode(err.response.status);
        }
        console.log(err.message);
      });
  }
  useEffect(() => {
    setInterval(() => {
      getLoggedIn();
    }, 14 * 60 * 1000);
    getLoggedIn();
  }, []);
  return (
    <React.Fragment>
      <AuthContext.Provider
        value={{ loggedIn, getLoggedIn, statusCode, setStatusCode }}
      >
        {props.children}
      </AuthContext.Provider>
    </React.Fragment>
  );
};

export default AuthContext;
export { AuthContextProvider };
