const Logouts = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  //   window.location.replace("/");
};

export default Logouts;
