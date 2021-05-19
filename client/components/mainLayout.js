import React from "react";
import Footer from "./Layouts/footer";
import MainNavbar from "./Layouts/mainNavbar";
import TopNavbar from "./Layouts/topNavbar";

const MainLayout = ({ children }) => {
  return (
    <div>
      <TopNavbar />
      <MainNavbar />
      {children}
      <br></br>
      <Footer />
    </div>
  );
};

export default MainLayout;
