import React, { useContext } from "react";
import { Button } from "antd";
import axios from "axios";
import AuthContext from "../../contexts/authContext";

const Logout = () => {
  const { getLoggedIn } = useContext(AuthContext);
  async function logoutButton() {
    await axios.get("https://backend.beecolony.org/auth/logout");
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
