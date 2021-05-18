import React from "react";
import Footer from "./Layouts/footer";
import MainNavbar from "./Layouts/mainNavbar";

const MainLayout = ({ children }) => {
  return (
    <div>
      <MainNavbar />
      {children}
      <br></br>
      <Footer />
    </div>
  );
};

export default MainLayout;
