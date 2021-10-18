import React, { useState, useContext, useEffect } from "react";
import GlobalHeader from "./globalHeader";
import AuthContext from "../../contexts/authContext";


const LayoutPage = ({ children, loggedIn }) => {

    console.log(loggedIn);

    return(
        <div className="site-layout">
            <GlobalHeader loggedIn={loggedIn} />
            { children }
        </div>
    )
};

export default LayoutPage;