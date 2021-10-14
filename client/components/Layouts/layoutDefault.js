import React from "react";
// import NavBar from "../global/Navbar";

const LayoutPage = ({ loggedIn, children }) => {
    return(
        <div className="site-layout">
            {/* <NavBar auth={loggedIn}/> */}
            { children }
        </div>
    )
};

export default LayoutPage;