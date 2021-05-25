import React, { createContext } from "react";
import Cookie from "js-cookie";

export const UserContext = createContext();

let _id = Cookie.get("_userId");
// console.log("eh", _id);

export const UserProvider = (props) => {
  return (
    <UserContext.Provider value={{ _id: _id }}>
      {props.children}
    </UserContext.Provider>
  );
};
