import React from "react";
import TopNavbar from "../components/Layouts/topNavbar";
import MainNavbar from "../components/Layouts/mainNavbar";
import Footer from "../components/Layouts/footer";

const NotFound = () => {
  return (
    <React.Fragment>
      {/* <TopNavbar /> */}
      <MainNavbar />
      <div className="main-404">
        <div id="notfound">
          <div className="notfound">
            <div className="notfound-404">
              <h3>Ooop! Page not found !</h3>
              <h1>
                <span>4</span>
                <span>0</span>
                <span>4</span>
              </h1>
            </div>
            <h2>we are sorry, but the page you requested was not found</h2>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default NotFound;
