import React, { useEffect } from "react";
import Cookies from "js-cookie";
// const token = localStorage.getItem("access_token")
const token = Cookies.get("access_token");
export default token;
