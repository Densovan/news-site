import "../styles/globals.css";
import MainLayout from "../components/mainLayout";
import axios from "axios";
import { AuthContextProvider } from "../contexts/authContext";

axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      {/* <MainLayout> */}
      <Component {...pageProps} />
      {/* </MainLayout> */}
    </AuthContextProvider>
  );
}

export default MyApp;
