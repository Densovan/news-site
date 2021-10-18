import React from "react";
import { useAuth } from "../../layouts/layoutAuth";

const Logout = () => {
  const { logout } = useAuth();
  async function handleLogout() {
    await logout();
  }
  return (
    <div onClick={handleLogout}>
      <span>Logout</span>
    </div>
  );
};

export default Logout;
