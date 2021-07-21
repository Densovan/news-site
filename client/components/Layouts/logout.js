import React, { useContext } from "react";
import { Button } from "antd";
import axios from "axios";
import AuthContext from "../../contexts/authContext";

const Logout = () => {
  const server = process.env.API_SECRET;
  const server_local = process.env.API_SECRET_LOCAL;
  const develop = process.env.NODE_ENV;
  const URL_ACCESS = develop === "development" ? server_local : server;

  const { getLoggedIn } = useContext(AuthContext);
  async function logoutButton() {
    await axios.get(`${URL_ACCESS}/auth/logout`);
    await getLoggedIn();
    // window.location.replace("/");
  }
  return (
    <div onClick={logoutButton}>
      <span>Logout</span>
    </div>
  );
};

export default Logout;
