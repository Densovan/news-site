import "../styles/globals.css";
import MainLayout from "../components/mainLayout";

function MyApp({ Component, pageProps }) {
  return (
    <MainLayout>
      <Component {...pageProps} />
      {/* <BackTop>
        <div className="back-top">
          <img style={{ width: "23px" }} src="/images/VA-Icon-White.png" />
        </div>
      </BackTop> */}
    </MainLayout>
  );
}

export default MyApp;
